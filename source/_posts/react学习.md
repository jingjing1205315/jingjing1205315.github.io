---
title: react学习
date: 2021-10-16 20:27:07
tags:
---

react入门学习，来自bilibili腾讯课堂

<!--more-->

# react入门
## 可以做什么
pc/h5 App  小程序（京东程序编译）
## 使用版本
react16.12.0
react-router^5.12.0
## 特色
函数组件和hooks

## 环境准备

### Node安装使用
nodejs 是基于chrome v8引擎的JavaScript运行环境
#### 前端开发环境
webpack  npm插件  server
#### 服务端动态编程于洋
写接口、链接数据库、Node web

#### node黑盒

```
node
```
就进入node的编程环境

### npm 使用

```
npm adduser | npm publish // 发布一个包，登录后发布
npm config set registry https://registry.npmjs.org/ // npm真正的地址
npm config set registry  https://registry.npm.taobao.org/ // 下载包地址换位淘宝映射
npm unpublish[包名] --force // 删除包
```

### yarn使用
#### yarn概念
前端包管理器，去npm平台下载包
速度快，更安全，更可靠

```
npm install yarn -g
npm upgrade yarn -g
```
#### yarn使用

```
yarn -v
yarn init
yarn install
yarn add/remove // 对应npm install 包名
yarn publish/login/logout
yarn run 
```

# react介绍
## 特性
声明式 组件化 灵活
组件化：侧重UI层
模块化：侧重功能
单/多页面 服务端渲染 RN-App
## 编写Hello world
### CDN
#### react核心库
建议加crossorigin，同时建议验证使用的 CDN 是否设置了 Access-Control-Allow-Origin: * HTTP 请求头：

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script> // 开发环境
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script> // 生成环境
```

#### reactDOM

```
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>  // 开发环境
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script> // 生成环境
```

```
yarn add react react-dom --save //将核心库和reactDOM下载到本地，直接引入本地node包中的文件
<script crossorigin src="./node_modules/react/umd/react.development.js"></script> 
<script crossorigin src="./node_modules/react/umd/react.production.min.js"></script> 

```
#### babel 解析ES6语法 解析jsx

```
<script crossorigin src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>  
```
### 核心语法

```
reactDom.render()
react.creatElement()
react.components()
```

### react核心语法应用

```
<div id="app"></div>
<script>
    var hello = React.createElement('h1', {
        className: 'red',
        name: 'liming',
    }, 'hello world');
    ReactDOM.render(hello, document.getElementById('app'));
</script>
```
# JSX介绍
js的语法糖 在js中编写html代码

```
<script crossorigin src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>  // 增加babel解析
```

```
<div id="app"></div>
<script type="text/babel"> // script 必须定义类型
    var name = 'liming';
    ReactDOM.render(
        <h1 className="red" name="liming">hello {name}</h1>, // html语法可以直接卸载render里
        document.getElementById('app'));
</script>
```

# 元素渲染

```
<div id="app"></div>
<script type="text/babel">
    function tick(){
        var time = new Date().toLocaleTimeString();
        var name = 'liming';
        var dom = <div>
                <h1 className="red" name="liming">hello {name}</h1>
                <h2>现在是：{time}</h2>
            </div>
        ReactDOM.render(
            dom,
            document.getElementById('app'));
    }
    setInterval(tick, 1000);
    
</script>
```
可以在html结构中看到，变动的只有：
<img src="./react学习/1634394697551.jpg" style="width: 400px;text-align: left" />