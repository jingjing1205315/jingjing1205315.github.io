---
title: Module的加载实现学习
date: 2020-07-20 20:00:00
tags: 
---
原文 [ES6标准入门](https://es6.ruanyifeng.com/#docs/module-loader)
### 1 浏览器加载

1. script标签多了type="module"属性可以加载es6的Module.同异步模式是defer。
script默认是同步，defer指异步下载，渲染完执行（DOM 结构完全生成，以及其他脚本执行完成）。async指异步下载，下载完终断渲染立即执行。

```
// 外联
<script type="module" src="./foo.js">
    
</script>

// 内嵌   
<script type="module">
    import $ from "./jquery/src/jquery.js";
    $('#message').text('Hi from jQuery!');
</script>
```

### ES6 模块与 CommonJS 模块的差异


| --- | --- | ---
|  | 输出值 | 值的生成 |
| --- | --- | --- |
| commonJs | 值的拷贝 | 运行时 |
| ES6 | 值的引用 | 编译时 |

***值的拷贝***
commonJS模块一旦加载，生成的原始类型的的值就不会改变

***值的引用--只读***
脚本真正执行时，根据只读引用去拿值，值变，拿到的会跟着变。

### Node.js 加载
Node.js 要求 ES6 模块采用.mjs后缀文件名

*注意，ES6 模块与 CommonJS 模块尽量不要混用。require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。反过来，.mjs文件里面也不能使用require命令，必须使用import。

```
{
  "type": "module", // module时ES6的模块不用.mjs后缀; commonJs时加载commonJS模块不用.cjs后缀。默认commonJS
  "main": "./src/index.js", // 入口文件--优先级低于exports
  "exports": { 只有支持 ES6 的 Node.js 才认识
   ".": "./main.js", // main的别名，优先于main
   ".": { // 为 ES6 模块和 CommonJS 指定不同的入口
      "require": "./main.cjs",
      "default": "./main.js"
    }
    "./submodule": "./src/submodule.js" // 子目录
  }
}
```


```

import feature from 'es-module-package/features/x.js';
```

#### ES6 模块加载 CommonJS 模块
*注意，import命令加载 CommonJS 模块，只能整体加载，不能只加载单一的输出项。
还有一种变通的加载方法，就是使用 Node.js 内置的module.createRequire()方法。

```
// cjs.cjs
module.exports = 'cjs';

// esm.mjs
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const cjs = require('./cjs.cjs');
cjs === 'cjs'; // true
```


#### CommonJS 模块加载 ES6 模块
只能使用import()这个方法加载。

```
(async () => {
  await import('./my-app.mjs');
})();
```

#### ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。

不要使用
this
arguments
require
module
exports
__filename
__dirname

### 循环加载

```
// a.js
var b = require('b');

// b.js
var a = require('a');
```
#### commonJS
只输出已经执行的部分，还未执行的部分不会输出。
b.js接着往下执行，等到全部执行完毕，再把执行权交还给a.js。于是，a.js接着往下执行，直到执行完毕。

#### ES6 

需要开发者自己保证，真正取值的时候能够取到值。

执行a.js, a中引用b.js，b输入a的接口，这时认为a的接口是存在的，接着执行a的接口。如果a并没有执行到此接口，则会报错。解决方式是将a的此接口提前。

