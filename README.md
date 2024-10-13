## 预备动作
注册阿里云ECS服务器和域名
备案服务器并设置域名DNS解析后(域名解析会有迟钝，一般10分钟就好了）
服务器系统镜像我选择的是debian12


## 在服务器上安装nginx
apt update 一下（如果失败了，注意换源）
然后apt install nginx即可，一般没问题



## 配置nginx

/etc/nginx/nginx.conf
注释掉include语句，只留下 include /etc/nginx/sites-enabled

编写自己的配置文件
例如在/etc/nginx/sites-available下新增一个nuclear文件
里面内容我已经备份了,在nginx_configure/nuclear下

## 拷贝文件到服务器
记得用dos2unix修改换行符
需要修改默认的用户www-data为root，否则会出现403forbidden错误
需要给文件权限，chmod -R 755 


## 若出现中文乱码
检查配置文件是否加入了charset utf-8

## 支持文件下载
参考这篇文章：https://www.cnblogs.com/goloving/p/13501265.html
注意root和alias的区别

其他的以后再说吧
