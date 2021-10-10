---
title: node学习
date: 2021-10-10 21:18:55
tags:
---

node学习记录

<!--more-->
v8引擎搬到服务器

优势：
用户多，github下载量；
擅长高并发：一个线程，连接后，出发一个内部事件，通过非阻塞I/o, 事件驱动机制，实现node.js宏观上并行。8G内存处理4w用户连接，Java、PHP、.net则只能处理4k；
还可以开发桌面应用electron 游戏等；

```
node -v
```
出来版本号，说明安装成功

# http 模块
也可以用node snippets 中的node-http-server来加载代码块

```
// 引入http模块
const http = require('http');
http.createServer(function(req, res){
    // req请求信息
    console.log(req);
    // 设置响应头 参数一：状态码；
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
    // 解决中文乱码
    res.write('<head><meta chareset="UTF-8" /></head>')
    // 输出到页面
    res.write('你好, nodejs');
    // 输出到页面
    res.write('hello, nodejs');
    // 必须有end，来结束相应
    res.end('end');
}).listen(8090);

console.log('Server running at http://127.0.0.1:8090/');


```

# url 模块

```
// 引入http模块
const http = require('http');
const url = require('url');
http.createServer(function(req, res){

    

    // req请求信息
    const user = url.parse(req.url, true).query;
    if(req.url != '/favicon.ico'){ // 图标每次都会有一个请求
        console.log('姓名：',user.name, '年龄:',user.age) // 姓名： zhangsan 年龄: 10
    }
    


    // 设置响应头 参数一：状态码；
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
    // 解决中文乱码
    res.write('<head><meta chareset="UTF-8" /></head>')
    // 输出到页面
    res.write('你好, nodejs');
    // 输出到页面
    res.write('hello, nodejs');
    // 必须有end，来结束相应
    res.end('end');
}).listen(8090);

console.log('Server running at http://127.0.0.1:8090/');
```
