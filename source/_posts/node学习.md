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

# supervisor

实时监听服务端目录文件，修改后重启node

```
npm install -g supervisor
```

需翻墙，或用cnpm

用supervisor代替node来运行程序

```
supervisor demo.js
```

模拟访问，node终端打印：姓名： zhang 年龄: undefined

```
curl http://127.0.0.1:8090/\?name\=zhang
```

# commonJs

JavaScript 模块化的标准，使JavaScript还可以开发：服务端应用，命令行工具，桌面图形界面应用。nodeJs是commonjs的实现

## node中，模块分两类

### 核心模块也叫系统模块

HTTP模块、URL模块、Fs模块等可直接引入使用

### 文件模块又叫自定义模块

把公共功能抽离成模块，通过exports或者module.exports 暴露出去

```
// 抽离一个utils.js
function addStr(str){
    return str+ '----aaa';
}
exports.addStr = addStr; // module.exports = addStr;
```

在程序中引入

```
const utils = require('./utils');
console.log(utils) // exports --> { addStr: [Function: addStr] } module.exports -->[Function: addStr]
```

应用到程序中

```
// 输出到页面
    res.write(utils.addStr('你好, nodejs')); // 你好, nodejs----aaa 用module.exports直接导出相当于导出的function，调用utils('你好, nodejs')；
```

**建议对象用module.exprots暴露，方法用exports暴露**

#### node_modules

node中默认回去node_modules中寻找模块

```
// 已知目录结构
-node_modules
	-axios
		index.js
```

```
// -node_modules -axios index.js
module.exports = {
    get(){
        console.log('获取')
    },
    post(){
        console.log('提交')
    }
}
```

引入方式一：

```
const axios = require('./node_modules/axios/index');
console.log(axios) // { get: [Function: get], post: [Function: post] }
```

引入方式二：

```
const axios = require('axios/index');
```

引入方式三：

```
const axios = require('axios');
```

node默认模块都放在node_modules中，引入模块时，会去找node_modules中模块的index.js

#### package.json

模块中没有index.js，可不可以呢？

```
// 已知目录结构
-node_modules
	-db
		db.js
```

```
const db = require('db');
```

这样是拿不到db的，这就需要package.json登场了

```
// 在db模块文件夹中
npm init 
```

产生package.json文件，"main": "db.js",是我们需要关注的行，标志这个模块的入口文件

```
{
  "name": "db",
  "version": "0.0.1",
  "description": "db",
  "main": "db.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```



