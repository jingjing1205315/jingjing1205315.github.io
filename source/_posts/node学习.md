---
title: node学习
date: 2021-10-10 21:18:55
tags:
---

node学习记录

<!--more-->
v8引擎搬到服务器

# 优势：
用户多，github下载量；
擅长高并发：一个线程，连接后，出发一个内部事件，通过非阻塞I/o, 事件驱动机制，实现node.js宏观上并行。8G内存处理4w用户连接，Java、PHP、.net则只能处理4k；
还可以开发桌面应用electron 游戏等；

```
node -v
```
出来版本号，说明安装成功

# node中，模块分两类，核心模块和文件模块

## 核心模块也叫系统模块

HTTP模块、URL模块、Fs模块等可直接引入使用

### http 模块

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

### url 模块

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

#### supervisor

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

### FS 模块

```
const fs = require('fs');
```

#### fs.stat() 检测是文件还是目录

```
fs.stat('./package.json', (err, data)=>{
    if(err){
        return;
    }
    console.log(`是文件：${data.isFile()}`)
    console.log(`是目录：${data.isDirectory()}`)
})
```

#### fs.mkdir() 创建目录

```
// 
fs.mkdir('./css', (err, data)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log(`创建成功`)
})
```

重复允许，报错

```
{ [Error: EEXIST: file already exists, mkdir './css'] errno: -17, code: 'EEXIST', syscall: 'mkdir', path: './css' }
```

#### fs.mkdir() 创建目录

```
// 
fs.mkdir('./css', (err, data)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log(`创建成功`)
})
```

#### fs.writeFile创建写入文件成功,存在则替换

```
fs.writeFile('./html/index.html','Hi!fs.writeFile', (err)=>{

    if(err){

        console.log(err)

        return;

    }

    console.log(`创建写入文件成功`)

})
```

**注意** ：文件所在的文件夹即./html必须存在，否则创建失败



#### fs.appendFile写入文件，每执行一次，向参数一中，写入参数二的内容

```
fs.appendFile('./css/base.css','body{color: red}\n', (err)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log(`创建写入文件成功`)
})
```

#### fs.readFile 读取文件

```
fs.readFile('./html/index.html', (err, data)=>{
    // data 是buffer数据
    if(err){
        console.log(err);
        return;
    }
    console.log(data) // <Buffer 48 69 21 66 73 2e 77 72 69 74 65 46 69 6c 65>
    console.log(data.toString()) // 将buffer转化为string类型 Hi!fs.writeFile
})
```

#### fs.readdir读取目录

```
fs.readdir('./html', (err, data)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(data) // [ 'index.html' ]目录下所有的文件及文件夹 深度遍历平铺展示
})
```

#### fs.rename重命名

```
fs.rename('./html/index.html', './html/index1.html',(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('重命名成功') // 重命名
})
```

#### fs.rename移动文件 (并没有测试成功)

```
fs.rename('./html/index.html', './aaa/index.html',(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('移动文件成功') // 移动文件 
})

```

#### fs.rmdir删除目录--只能删除空目录

```
fs.rmdir('./aaa', (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('删除目录成功') // 删除目录 
})
```

#### fs.unlink删除文件

```
fs.unlink('./aaa/aaa', (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('删除文件成功') // 删除目录 
})
```
## 文件模块又叫自定义模块

把公共功能抽离成模块，通过exports或者module.exports 暴露出去

# commonJs

JavaScript 模块化的标准，使JavaScript还可以开发：服务端应用，命令行工具，桌面图形界面应用。nodeJs是commonjs的实现

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

## node_modules

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

## package.json

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

# 包与node

## 规范的包目录

- Package.json 包描述文件

- bin: 用于存放可执行的二进制文件目录

- lib: 用于存放JavaScript代码的目录

- doc: 用于存放文档的目录

  

## npm

最大的开源代码的生态系统，允许用户上传和下载自定义node包、命令行工具

```
npm init --yes
```

### md5

生成package.json后，去npmjs.com搜索你需要的包，下载第三方包, 如下载md5包

```
npm install md5

// 程序中引入
const md5 = require('md5');
md5('123456') // 'e10adc3949ba59abbe56e057f20f883e'
```

Package.json中的dependencies就会有这个包, **建议：** npm install 包 --sava 是写入dependencies的标准用法。

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
  "license": "ISC",
  "dependencies": {
    "md5": "^2.3.0"
  }
}
```



## silly-datetime

```
npm install silly-datetime --save
const sd = require('silly-datetime');
sd.format(new Date(), 'YYYY-MM-DD HH:mm') // 2021-10-12 12:48
```

# npm 命令

## 查看npm版本

```
npm -v  //6.4.1
```

###### 安装：无包名代表安装package.json里的所有包。卸载：npm uninstall 包名

```
npm install [包名]
```

也可以删掉package.json中的包，删掉node_modules中的包，允许 npm i来卸载

## npm list

```
npm list
/*
db@0.0.1 /Users/**/Documents/nodejs_demo/node_modules/db
├─┬ md5@2.3.0
│ ├── charenc@0.0.2
│ ├── crypt@0.0.2
│ └── is-buffer@1.1.6
└── silly-datetime@0.1.2
*/
```

## Npm info moduleName

```
npm info moduleName
```

版本号、 依赖

```
md5@2.3.0 | BSD-3-Clause | deps: 3 | versions: 7
js function for hashing messages with MD5
https://github.com/pvorb/node-md5#readme

dist
.tarball: https://registry.npmjs.org/md5/-/md5-2.3.0.tgz
.shasum: c3da9a6aae3a30b46b7b0c349b87b110dc3bda4f
.integrity: sha512-T1GITYmFaKuO91vxyoQMFETst+O71VUPEU3ze5GNzDm0OWdP8v1ziTaAEPUr/3kLsY3Sftgz242A1SetQiDL7g==
.unpackedSize: 21.4 kB

dependencies:
charenc: 0.0.2    crypt: 0.0.2      is-buffer: ~1.1.6 

maintainers:
- coolaj86 <coolaj86@gmail.com>
- pvorb <paul@vorba.ch>

dist-tags:
latest: 2.3.0  

published a year ago by pvorb <paul@vorba.ch>
```

## 指定版本安装

```
npm install node-media-server@2.1.1
```

## 版本号前缀

```
"dependencies": {
    "md5": "^2.3.0",
    "silly-datetime": "^0.1.2"
  }
```

^:  大版本不变，后面两位取最新

~：前两位不变，最后一位取最新

*：全部取最新



## 淘宝镜像

Npm 每10分钟同步到国内镜像一次

```
npm i cnpm -g --registry=https://registry.npm.taobao.org
```

之后下载可以使用

```
cnpm i md5
```



