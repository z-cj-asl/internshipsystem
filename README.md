# 项目启动

## 一、依赖
### 1、安装MySQL并开启服务
 #### 1.1 导入数据库表
     source   路径+ internshipsystem.sql;（在根目录下的internshipsystem.sql）
 ####  1.2 修改连接的MySQL数据库的参数
     /src/server/server.js中修改mysql.createConnection的参数
 ### 2、node.js版本16.15.0

#
## 二、启动项目
 
### 1、启动服务器（固定在了3001端口）
    cd src/server
    node server.js

### 2、启动项目（在根目录/internship下）
    npm run start
    默认启动在3000端口

#
## 三、重要文件

### 1、src/server/server.js
    连接数据库的方法
    app.listen(3001,)把服务器启动在了3001端口

### 2、src/setupProxy.js
    解决本地跨域的问题