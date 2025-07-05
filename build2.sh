#!/bin/bash

# 检查必要文件
if [ ! -f "data.txt" ]; then
    echo -e "\033[31m错误：data.txt文件不存在\033[0m"
    exit 1
fi

if [ ! -f ".env.production" ]; then
    echo -e "\033[31m错误：.env.production文件不存在\033[0m"
    exit 1
fi

# 目标目录
target_dir="./build-dist"

# 创建目标目录（如果不存在）
mkdir -p "$target_dir"

# 备份原始.env.production
cp .env.production .env.production.bak

# 使用awk按空行分割数据组
awk -v RS='\n\n' '{print NR ":", $0 "\n"}' data.txt

# 获取总组数
total_groups=$(awk -v RS='\n\n' 'END{print NR}' data.txt)
echo -e "\033[36m共找到 ${total_groups} 组配置\033[0m"

# 处理每组数据
for ((group=1; group<=$total_groups; group++)); do
    echo -e "\n\033[34m===== 正在处理第 ${group} 组配置 =====\033[0m"

    # 提取当前组的三行配置
    current_group=$(awk -v RS='\n\n' -v group="$group" 'NR==group{print $0}' data.txt)

    # 检查是否获取到有效数据
    if [ -z "$current_group" ]; then
        echo -e "\033[33m警告：第 ${group} 组数据为空，跳过\033[0m"
        continue
    fi

    # 从VITE_JSON_BASE_PATH中提取文件名
    file_name=$(echo "$current_group" | grep 'VITE_JSON_BASE_PATH' | awk -F'/' '{print $NF}')
    if [ -z "$file_name" ]; then
        echo -e "\033[33m警告：无法从配置中提取文件名，使用默认index.html\033[0m"
        file_name="index"
    fi

    # 更新.env.production
    echo -e "\033[36m更新.env.production文件...\033[0m"
    {
        # 保留原始注释
        sed -n '/^#/p' .env.production.bak
        # 添加当前组配置
        echo "$current_group"
        # 保留其他非目标配置
        sed -n '/^#/!{/VITE_RES_BASE_PATH/!{/VITE_JSON_BASE_PATH/!{/VITE_JC_BASE_PATH/!p}}}' .env.production.bak
    } > .env.production

    # 执行构建
    echo -e "\033[36m执行 npm run build...\033[0m"
    npm run build

    # 处理dist目录
    if [ -d "./dist" ]; then
        # 重命名index.html
        if [ -f "./dist/index.html" ]; then
            new_name="${file_name}.html"
            echo -e "\033[36m将index.html重命名为 ${new_name}...\033[0m"
            mv "./dist/index.html" "./dist/${new_name}"
        else
            echo -e "\033[33m警告：dist/index.html 不存在\033[0m"
        fi

        # 处理static/static2合并
        if [ -d "./dist/static/static2" ]; then
            echo -e "\033[36m合并static/static2到static2目录...\033[0m"
            mkdir -p "./dist/static2"

            # 使用rsync或cp合并目录
            if command -v rsync >/dev/null 2>&1; then
                rsync -a "./dist/static/static2/" "./dist/static2/"
            else
                cp -Rf "./dist/static/static2/." "./dist/static2/"
            fi

            # 删除源目录
            rm -rf "./dist/static/static2"

            # 检查static目录是否为空
            if [ -z "$(ls -A ./dist/static)" ]; then
                echo -e "\033[36m删除空static目录...\033[0m"
                rm -rf "./dist/static"
            fi
        fi

        # 移动整个dist到目标目录
        echo -e "\033[36m移动dist到目标目录...\033[0m"

        # 使用rsync合并目录（保留所有文件）
        if command -v rsync >/dev/null 2>&1; then
            rsync -a --delete-after ./dist/ "$target_dir/"
        else
            # 如果没有rsync，使用cp合并
            cp -Rf ./dist/* "$target_dir/"
        fi

        # 删除临时dist目录
        rm -rf ./dist
    else
        echo -e "\033[33m警告：dist目录不存在，跳过移动\033[0m"
    fi

    echo -e "\033[32m第 ${group} 组处理完成\033[0m"
done

# 恢复原始.env.production
mv .env.production.bak .env.production
echo -e "\033[36m已恢复原始.env.production文件\033[0m"

# 显示最终目录结构
echo -e "\n\033[32m${target_dir} 最终目录结构：\033[0m"
if command -v tree >/dev/null 2>&1; then
    tree "$target_dir"
else
    ls -R "$target_dir"
fi
