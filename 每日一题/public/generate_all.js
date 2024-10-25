const fs = require('fs');
const path = require('path');

// 获取当前目录下的所有文件和文件夹
fs.readdir('.', (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // 过滤出HTML文件
    const htmlFiles = files.filter(file => path.extname(file) === '.html');

	    // 创建HTML页面
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>每日一题</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #questionList {
            list-style: none;
            padding: 0;
        }
        #questionList li {
            margin-bottom: 10px;
        }
        a {
            text-decoration: none;
            color: #0000EE;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>每日一题</h1>
    <ul>
        ${htmlFiles.map(file => `<li><a href="${file}">${file}</a></li>`).join('')}
    </ul>
    <a href="daily_problem/edit_problem.html">写题解</a>
</body>
</html>
    `;

    // 将HTML内容写入一个新的HTML文件
    fs.writeFile('index.html', htmlContent, err => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('HTML file created successfully.');
        }
    });
});
