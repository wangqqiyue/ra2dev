#!/bin/bash

# 文件名，包含要下载的网址
input_file="to_download.list"

# 检查输入文件是否存在
if [ ! -f "$input_file" ]; then
    echo "Input file does not exist."
    exit 1
fi

# 读取文件中的每个网址
while IFS= read -r url; do
    #根据网址拼凑出文件名
    #注意，变量后的空格不能加空格
    filename=$(echo "$url" | awk -F'/' '{print $NF}')
   
    if [ -z "$filename" ]; then
        echo "Invalid URL: $url"
        continue
    fi

    # 使用 curl 下载文件
    # -k 允许不安全的 SSL 证书
    # -o 使用网址的后缀作为文件名
    curl -k -o "assets/$filename" "$url"
    
    # 检查 curl 命令是否成功执行
    if [ $? -eq 0 ]; then
        echo "Downloaded: $url"
    else
        echo "Failed to download: $url"
    fi
done < "$input_file"


