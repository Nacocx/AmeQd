#!/bin/sh

# 执行 npm run build
echo "\033[36m正在执行 npm run build...\033[0m"
npm run build

# 检查 ./dist/static/static2 是否存在
sourcePath="./dist/static/static2"
destPath="./dist/static2"

if [ -d "$sourcePath" ]; then
    # 创建目标目录（如果不存在）
    mkdir -p "$destPath"

    # 合并目录内容
    echo "\033[36m正在合并目录从 $sourcePath 到 $destPath...\033[0m"
    if command -v rsync >/dev/null 2>&1; then
        rsync -a "$sourcePath"/ "$destPath/"
    else
        cp -R "$sourcePath"/. "$destPath/"
    fi

    # 删除源目录
    rm -rf "$sourcePath"

    # 检查 static 文件夹是否为空
    staticFolder="./dist/static"
    if [ -d "$staticFolder" ] && [ -z "$(ls -A "$staticFolder")" ]; then
        echo "\033[33mstatic 文件夹为空，正在删除...\033[0m"
        rm -rf "$staticFolder"
    fi
else
    echo "\033[33m警告：$sourcePath 不存在，跳过文件移动\033[0m"
fi

# 显示目录结构
echo "\n\033[32m./dist 目录结构：\033[0m"
if command -v tree >/dev/null 2>&1; then
    tree ./dist
else
    ls -R ./dist
fi