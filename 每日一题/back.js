const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
		const { title, author, link, link_description, problem_description, solutionText, solutionCode } = req.body;
		const date = new Date();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以加1，确保两位数
		const year = String(date.getFullYear()).slice(-4); // 获取最后两位年份
		const day = String(date.getDate()).padStart(2, "0"); // 日期，确保两位数

		const filename = `${year}${month}${day}_${title.replace(/\s+/g, "")}_${author.replace(/\s+/g, "")}.html`;

		function escapeHtmlChars(str) {
				return str.replace(/&/g, '&amp;')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/"/g, '&quot;')
								.replace(/'/g, '&#39;');
		}

		// 使用示例

		const escapedSolutionCode = escapeHtmlChars(solutionCode);

		const htmlContent = `
			<!DOCTYPE html>
<html lang="en">
		<head>
				<meta charset="UTF-8">
				<title>${title} by ${author}</title>
						<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
						<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

						<!-- and it's easy to individually load additional languages -->
						<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"></script>

						<script>hljs.highlightAll();</script>

		</head>
		<body>
				<div>
						<h1>${title}</h1>
						<h2>by ${author}</h2>
						<a href="${link}">${link_description}</a>
						<p>题目描述</p>
						<pre>
						<code>
   ${problem_description}
   </code>
						</pre>
						<p> 题解</p>
						<pre>
				${solutionText}
<code>
				${escapedSolutionCode}
</code>
						</pre>

				</div>

		</body>
</html>

	`;

		fs.writeFile(path.join(__dirname, "public", filename), htmlContent, (err) => {
				if (err) {
						console.error(err);
						res.status(500).send("Error writing file");
				} else {
						res.send({
								message: "HTML file generated successfully.",
								link: `${filename}`,
						});
				}
		});
		// 获取当前目录下的所有文件和文件夹
		fs.readdir('public', (err, files) => {
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
		${htmlFiles.map(file => `<li><a href="/daily_problem/${file}">${file}</a></li>`).join('')}
	</ul>
	<a href="/daily_problem/edit_problem.html">写题解</a>
</body>
</html>
	`;

				// 将HTML内容写入一个新的HTML文件
				fs.writeFile('public/index.html', htmlContent, err => {
						if (err) {
								console.error('Error writing file:', err);
						} else {
								console.log('HTML file created successfully.');
						}
				});
		});

});

								app.use(express.static("public"));




								const PORT = process.env.PORT || 3000;
								app.listen(PORT, () => {
										console.log(`Server is running on port ${PORT}`);
								});

