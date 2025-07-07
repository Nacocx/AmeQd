#!/bin/bash

set -euo pipefail

# 检查必要文件
if [ ! -f "data.txt" ]; then
    echo -e "\033[31m错误：data.txt 文件不存在\033[0m"
    exit 1
fi

if [ ! -f ".env.production" ]; then
    echo -e "\033[31m错误：.env.production 文件不存在\033[0m"
    exit 1
fi

# 自动恢复原始 .env.production
cp .env.production .env.production.bak
trap 'mv -f .env.production.bak .env.production; echo -e "\033[36m已恢复原始 .env.production 文件\033[0m"' EXIT

# 创建目标目录
target_dir="./build-dist"
mkdir -p "$target_dir"

# 获取总组数
total_groups=$(awk -v RS='\n\n' 'END{print NR}' data.txt)
echo -e "\033[36m共找到 ${total_groups} 组配置\033[0m"

# 循环处理每组配置
for ((group=1; group<=total_groups; group++)); do
    echo -e "\n\033[34m===== 正在处理第 ${group} 组配置 =====\033[0m"

    # 提取当前组配置
    current_group=$(awk -v RS='\n\n' -v group="$group" 'NR==group{print $0}' data.txt)
    if [ -z "$(echo "$current_group" | grep -v '^\s*$')" ]; then
        echo -e "\033[33m警告：第 ${group} 组数据为空，跳过\033[0m"
        continue
    fi

    # 提取 HTML 文件名（同时也是 static 子目录名）
    file_name=$(echo "$current_group" | grep 'VITE_JSON_BASE_PATH' | sed 's|.*/||' | sed 's|\..*||')
    file_name=${file_name:-index}
    html_output="${file_name}.html"
    echo -e "\033[36m使用文件名：${html_output}\033[0m"

    # 替换 .env.production
    {
        grep '^#' .env.production.bak
        grep -v '^#' .env.production.bak | grep -vE '^VITE_(RES|JSON|JC)_BASE_PATH='
        echo "$current_group"
    } > .env.production

    # 构建项目
    echo -e "\033[36m执行 npm run build...\033[0m"
    if ! npm run build; then
        echo -e "\033[31m构建失败，跳过该组\033[0m"
        continue
    fi

    # 检查构建输出
    if [ ! -d "./dist" ]; then
        echo -e "\033[33m警告：dist 目录不存在，跳过该组\033[0m"
        continue
    fi

    # 移动 html 文件
    if [ -f "./dist/index.html" ]; then
        mv "./dist/index.html" "$target_dir/${html_output}"
        echo -e "\033[36m已移动 HTML 到：$target_dir/${html_output}\033[0m"
    else
        echo -e "\033[33m警告：dist/index.html 不存在\033[0m"
    fi

    # 合并 static/static2 到 build-dist/static2/<file_name>/
    if [ -d "./dist/static/static2" ]; then
        static_target="$target_dir/static2/${file_name}"
        echo -e "\033[36m复制 static2 内容到 $static_target\033[0m"
        mkdir -p "$static_target"
        if command -v rsync >/dev/null 2>&1; then
            rsync -a "./dist/static/static2/" "$static_target/"
        else
            cp -Rf "./dist/static/static2/." "$static_target/"
        fi
    else
        echo -e "\033[33m警告：未找到 static/static2，跳过资源复制\033[0m"
    fi

    # 清理 dist 目录
    rm -rf ./dist

    echo -e "\033[32m第 ${group} 组处理完成 ✅\033[0m"
done

# 显示最终目录结构
echo -e "\n\033[32m最终构建完成，目录结构如下：\033[0m"
if command -v tree >/dev/null 2>&1; then
    tree "$target_dir"
else
    ls -R "$target_dir"
fi
