---
title: webpack config遇到的系列问题
date: 2020-12-23 15:48:28
tags:
---

### webpack 5 与 webpack-dev-server 3兼容性问题

用webpack-dev-server启动项目失败，报错：Error: Cannot find module 'webpack-cli/bin/config-yargs'

解决办法：使用 webpack serve 

此时已实现live reload


### npm安装webpack插件报checkPermissions错误

起因是运行webpack-dev-server时，各种报错Cannot find module，然后卸载、安装npm包

```
npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN checkPermissions Missing write access to /Users/jing/Documents/testwebpack/node_modules/_p-locate@5.0.0@p-locate/node_modules/p-limit
npm WARN checkPermissions Missing write access to /Users/jing/Documents/testwebpack/node_modules/_schema-utils@3.0.0@schema-utils/node_modules/ajv
npm WARN checkPermissions Missing write access to /Users/jing/Documents/testwebpack/node_modules/_schema-utils@3.0.0@schema-utils/node_modules/ajv-keywords
npm WARN checkPermissions Missing write access to /Users/jing/Documents/testwebpack/node_modules/ajv-errors
npm WARN checkPermissions Missing write access to /Users/jing/Documents/testwebpack/node_modules/assign-symbols
npm WARN checkPermissions Missing write access to /Users/jing/Documents/testwebpack/node_modules/async-limiter
npm WARN checkPermissions Missing write access to /Users/jing/Documents/testwebpack/node_modules/default-gateway
```

然后用sudo npm i，还是会报错。

有人说可能是npm和cnpm交叉使用造成的。

于是暴利删除node_modules.

再运行下面代码，终于不再报错

```
sudo npm i

```
### hotModule不起效果

```
log.js:26 [HMR] Update failed: ChunkLoadError: Loading hot update chunk 143 failed.
(missing: http://localhost:8080/143.f7a142c5c6905a4f3f57.hot-update.js)
    at http://localhost:8080/app.bundle.js:2:233347
    at new Promise (<anonymous>)
    at s (http://localhost:8080/app.bundle.js:2:233299)
    at http://localhost:8080/app.bundle.js:2:237441
    at Array.forEach (<anonymous>)
    at Object.o.hmrC.jsonp (http://localhost:8080/app.bundle.js:2:237387)
    at http://localhost:8080/app.bundle.js:2:229707
    at Array.reduce (<anonymous>)
    at http://localhost:8080/app.bundle.js:2:229669
```
解决方案：入口文件改为一个。

```
entry: {
    app: './src/index.js',
    //print: './src/print.js'
  },
```
**注意**
这时候更改入口index.js引入的print.js里的内容，并不能起到热更新的效果。想要print.js的修改也适用热更新。

```
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

热更新会在css、vue文件中起效果。因为style-loader、vue-loder已经替我们做了 module.hot.accept
### webpack版本


```
"webpack": "^5.11.0",
"webpack-cli": "^4.2.0",
"webpack-dev-server": "^3.11.0"
```

### webpack config

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    app: './src/index.js',
    //print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
 
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(xml)$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: 'dist'
    }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

### 入口文件hotModule测试

```
index.js
import _ from 'lodash';
import './style.css';
import MyImage from './icon.png';
import data from './mock/data.xml';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);
  return element;
}
document.body.appendChild(component());
if (module.hot) {
  module.hot.accept('./print.js', function () {// print.js 文件改动会触发hotModule
    console.log('Accepting the updated printMe module!'); 

  })
  module.hot.accept(); // index文件有改动会触发hotModule，不加这行，index文件的改动触发的是liveReload
}
  
```
```
print.js
export default function printMe() {
    console.log('I got called from print.js!');
  }
```

问题是：print文件改动了，点击按钮时 btn.onclick触发的仍旧是旧的printMe。

index文件改动了，页面会再写入一条component();

### 参考文章
[npm安装webpack插件报checkPermissions错误](http://www.qiutianaimeili.com/html/page/2020/02/zde66zxtxpd.html)

[解决报错Cannot find module 'webpack-cli/bin/config-yargs'
](https://blog.csdn.net/sxs7970/article/details/88746939)

[webpack 5 与 webpack-dev-server 3兼容性问题](https://www.cnblogs.com/xiaorong-9/p/14069684.html)

[Webpack 用来做模块热替换(hot module replacement)](https://segmentfault.com/a/1190000003872635)

[模块热替换api](http://www.myjscode.com/page/article109.html)


