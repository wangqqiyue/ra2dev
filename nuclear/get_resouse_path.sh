#!/bin/bash

# 遍历当前目录下的所有 .js 文件
for file in *.js; do
    # 检查文件是否存在
    if [ -f "$file" ]; then
        echo "Searching for .gif filenames in $file..."
        # 使用 grep 查找 .gif 文件名
        # -o 选项使 grep 仅输出匹配的部分
        # -R 选项用于递归地搜索文件
        # --only-matching 仅输出匹配的文本
        grep -o 'https?://[^"'\'']*\.gif' "$file"
    else
        echo "No .js files found."
        break
    fi
done
