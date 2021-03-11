---
title: 私有npm包创建及引用
date: 2021-01-29 21:36:43
tags:
---

私有npm包创建和开发
<!-- more -->
### npm包创建
npm init

```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (test)

```
根据提示输入包名、版本、描述、入口文件、测试指令、keywords、author等，不需要更改的直接回车。

生成package.json

```
{
  "name": "shareguidemask",
  "version": "1.0.0",
  "description": "a npm packege includes share guide mask",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "shareGuideMask"
  ],
  "author": "jing",
  "license": "ISC",
  "devDependencies": {
    "vue": "^2.6.12"
  }
}
```

写好程序，在入口文件index.js export

```
import vue from 'vue';
import app from './src/index.vue';
export default app;
```

### 推到仓库

加入git版本控制

```
git init
```
提交到gitHub仓库做实验

```
git add .
git ci -m 'massege'
```
添加远程仓库地址

```
git remote add origin git@github.com:jingjing1205315/
```
推到远程

```
git push -u origin master
```

### 私有项目用npm包的方式引入

```
npm install <npm包名> --registry=<npm包源>
```


### 打包报错

 ```
 [Vue warn]: You are using the runtime-only build of Vue where the template c
 ```
因为vue包入口文件是runtime模式,这样引入的单文件组件就不能compiler，解决方式是webpack config中设置到compiler模式的vue别名。

```
module.exports = {
    // 省略...
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },

```
[You are using the runtime-only build of Vue where the template compiler is not available. Either pre](https://blog.csdn.net/wxl1555/article/details/83187647)


[VUE问题：You are using the runtime-only build of Vue where the template compiler is not available.
](https://www.pianshen.com/article/4406262022/)


### 开发阶段修改私有npm包

npm包修改，需要重新发版。项目中要安装相应的npm包版本，非常繁琐。找到了软连接的方式来做npm包修改的调试。

进入npm包的文件夹

```
npm link
```

回到项目的文件夹

```
npm link <包名>
```
这时，修改npm包的内容，可以实时展现在项目中。调试起来很方便。

[npm 私有包依赖 本地开发调试频繁更新解决方案](https://www.jianshu.com/p/d0c887cf730e?utm_campaign)



### 引入项目 No ESLint configuration found报错
 vue cli3解决办法 // vue.config.js添加如下内容

```
module.exports = {
  chainWebpack: config => config.resolve.symlinks(false)
}
```
webpack项目 webpack.config.js

```
module.exports = {
  //...
  resolve: {
    symlinks: false
  }
};
```

[webpack项目，link本地包出现No ESLint configuration found 问题解决](https://blog.csdn.net/qq_35261296/article/details/103990046)


### 参考文章

[如何安装私有 npm 包？](https://www.cnblogs.com/cag2050/p/10724196.html)

