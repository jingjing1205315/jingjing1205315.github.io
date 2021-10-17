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
#### 服务端动态编程语言
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
## JSX介绍
JSX， 一种 JavaScript 的语法扩展。元素是构成 React 应用的最小单位，JSX 就是用来声明 React 当中的元素。 在js中编写html代码

- 添加自定义属性需要使用 data- 前缀。

- 在 JSX 中不能使用 if else 语句，但可以使用 conditional (三元运算) 表达式来替代

- 注释需要写在花括号中

- JSX 允许在模板中插入数组，数组会自动展开所有成员：

- 一些标识符像 class 和 for 不建议作为 XML 属性名。作为替代，React DOM 使用 className 和 htmlFor 来做对应的属性。

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

## 元素渲染
model

```
<div id="app"></div>
<script type="text/babel">
    function tick(){
        var time = new Date().toLocaleTimeString();
        var name = 'liming';
        var dom = <div> // 多个标签时一定要有根元素
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
view
可以在html结构中看到，有差异才渲染，变动的只有：
<img src="./react学习/1634394697551.jpg" style="width: 400px;text-align: left;margin:0;" />

## 组件和props
### React.createClass(); // 废弃，笨重，不灵活
### 函数式组件（无状态组件）

```
<script type="text/babel">
    function Hello(props){ // 函数式组件，无生命周期
        return <div>
                <h1 className="red">hello {props.name}</h1>
                <h2>现在是：{props.time}</h2>
            </div>
    }
    
    ReactDOM.render(
        <Hello time="晚上" name='LiMing' />,
        document.getElementById('app'));
</script>
```
### React.Component

```
<script type="text/babel">
    class Hello extends React.Component{ // 正常组件，有生命周期
        render(){
            return <div>
                <h1 className="red">hello { this.props.name}</h1>
                <h2>现在是：{ this.props.time}</h2>
            </div>
        }
    }
    ReactDOM.render(
        <Hello time="晚上" name='LiMing' />,
        document.getElementById('app'));
</script>
```

## React生命周期
执行过程，四个阶段：
组件初始化阶段
组件加载阶段
组件更新阶段
组件销毁阶段

<img src="./react学习/16775500-8d325f8093591c76.webp" style="width: 100%;text-align: left;margin:0;" />

### 初始化和加载阶段

```
<script type="text/babel">        
    class Hello extends React.Component{ // 正常组件，有生命周期
        constructor(props){
            console.log('初始化阶段')
            // 初始化props
            super(props)
            // 初始化状态
            this.state = {
                name: 'Liming',
                time: '晚上'
            }
        }
        componentWillMount(){
            console.log('组件加载前')
        }
        componentDidMount(){
            console.log('组件加载后')
        }
        
        render(){
            console.log('组件加载或组件更新')
            return <div>
                <h1 className="red">hello { this.state.name}</h1>
                <h2>现在是：{ this.state.time}</h2>
                <button onClick={this.updateUser} >更新</button>
            </div>
        }
    }
    ReactDOM.render(
        <Hello time="晚上" name='LiMing' />,
        document.getElementById('app'));
</script>
```
打印顺序

```
初始化阶段constructor
组件加载前componentWillMount
组件加载或组件更新render
组件加载后componentDidMount
```
### 更新阶段
```
<script type="text/babel">        
    class Hello extends React.Component{ // 正常组件，有生命周期
        constructor(props){
            console.log('初始化阶段')
            // 初始化props
            super(props)
            // 初始化状态
            this.state = {
                name: 'Liming',
                time: '晚上'
            }
        }
        componentWillMount(){
            console.log('组件加载前')
        }
        componentDidMount(){
            console.log('组件加载后')
        }
        updateUser = () => { // 需用箭头函数 或updateUser = function() {} 不然this指向undefined
            // this.state.name = 'Tim'; // 错误，不会触发render
            this.setState({
                name: 'Tim'
            })
        }
        shouldComponentUpdate(){
            return true; // true 代表需要更新 false代表不更新
        }
        componentWillUpdate(){
            console.log('组件将要更新')
        }
        componentDidUpdate(){
            console.log('组件已经更新')
        }
        render(){
            console.log('组件加载或组件更新')
            return <div>
                <h1 className="red">hello { this.state.name}</h1>
                <h2>现在是：{ this.state.time}</h2>
                <button onClick={this.updateUser} >更新</button> // onClick后的函数并一定不要加()
            </div>
        }
    }
    ReactDOM.render(
        <Hello time="晚上" name='LiMing' />,
        document.getElementById('app'));
</script>
```

```
数据是否需要更新shouldComponentUpdate
组件将要更新componentWillUpdate
组件加载或组件更新render
组件已经更新componentDidUpdate
```
## 事件处理

react组件中普通的方法中的this指向undefined 可以用箭头函数

```
updateUser () { 
    console.log(this) // undefined
    this.setState({
        name: 'Tim'
    })
}
```
但还是想用这种写法的话

```
<script type="text/babel">        
    class Hello extends React.Component{ // 正常组件，有生命周期
        constructor(props){
            console.log('初始化阶段')
            // 初始化props
            super(props)
            // 初始化状态
            this.state = {
                name: 'Liming',
                time: '晚上'
            }
            this.updateUser = this.updateUser.bind(this); // 给自己定义事件绑定this
        }
        
        updateUser () { // react组件中普通的方法中的this指向undefined 可以用箭头函数
            console.log(this) // 组件实例
            this.setState({
                name: 'Tim'
            })
        }
        
        render(){
            console.log('组件加载或组件更新')
            return <div>
                <h1 className="red">hello { this.state.name}</h1>
                <h2>现在是：{ this.state.time}</h2>
                <button onClick={this.updateUser} >更新</button>
            </div>
        }
    }
    ReactDOM.render(
        <Hello time="晚上" name='LiMing' />,
        document.getElementById('app'));
</script>
```

或者修改点击事件

```
<button onClick={() => this.updateUser()} >更新</button>
或
<button onClick={this.updateUser.bind(this)} >更新</button>
```
## 条件判断
通过if else或者三目判断出应用的组件，再把组件放到应用的位置

```
<script type="text/babel">        
    function Login(props){
        return <button onClick={props.updateUser}>登录</button>
    }
    function Logout(props){
        return <button onClick={props.updateUser}>登出</button>
    }
    class Hello extends React.Component{ // 正常组件，有生命周期
        state = {
            name: 'LiMing',
            isLogin: false
        }
        updateUser = ()=> { // react组件中普通的方法中的this指向undefined 可以用箭头函数
            this.setState({
                isLogin: !this.state.isLogin
            })
        }
        
        render(){
            const {isLogin} = this.state;
            let button;
            if(isLogin){ // 条件判断button为登录还是登出，也可用三目
                button = <Login updateUser={this.updateUser}/> // 向子组件传递自定义事件，子组件可通过出发传递的事件来修改父组件的state
            }else{
                button = <Logout updateUser={this.updateUser}/>
            }
            return <div>
                <h1 className="red">hello { this.state.name}</h1>
                {button}
            </div>
        }
    }
    ReactDOM.render(
        <Hello time="晚上" name='LiMing' />,
        document.getElementById('app'));
</script>
```
## 列表渲染
将[1,2,3,4,5]转化为[&lt;li key="0"&gt;1&lt;/li&gt;, &lt;li key="1"&gt;2&lt;/li&gt;,....]，将转化后的数组放在相应的位置

```
<script type="text/babel">        
    class List extends React.Component{ // 正常组件，有生命周期
        state = {
            list: [1,2,3,4,5],
        }
        render(){
            const { list } = this.state;
            return <ul>
                {list.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        }
    }
    ReactDOM.render(
        <List  />,
        document.getElementById('app'));
</script>
```

## 表单应用
需要在表单数据修改onChange，主动更新state中的value，

```
this.setState({
    val: event.target.value
})
```

```
<script type="text/babel">        
    class TodoList extends React.Component{ // 正常组件，有生命周期
        state = {
            val: '',
            list: [],
        }
        changeHandler = (event)=>{
            this.setState({
                val: event.target.value
            })
            // this.state.val = event.target.value; // 直接赋值input框的输入都输不进去
        }
        add = ()=>{

            this.state.list.push(this.state.val);
            this.setState({
                list: this.state.list
            })
        }
        render(){
            const { val, list } = this.state;
            return <div>
                <input type="text" value={val} onChange={this.changeHandler} />
                <button onClick={this.add} >添加</button>
                <ul>
                    {list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        }
    }
    ReactDOM.render(
        <TodoList  />,
        document.getElementById('app'));
</script>
```

# react应用入门 
react-demo库中的react-app
## 脚手架使用

```
npm install -g create-react-app
yarn add -g create-react-app
create-react-app react-demo
```
react脚手架构建的项目，webpack配置是隐藏的，运行命令，显示，可以做修改。一旦显示就不能再隐藏

```
yarn run eject
```

## 单页面开发
入口文件index.js

```
import React from 'react'; // 核心库
import ReactDOM from 'react-dom'; // dom操作库
import './index.css';
import App from './App'; // 业务组件
import reportWebVitals from './reportWebVitals'; // 性能监控

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

我们的业务代码在App.js

```
// App.js
import './App.scss'; // 引入css或者scss

function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
      <p>欢迎</p>
    </div>
  );
}

export default App;

```

应用sass，只需安装

```
npm i -S node-sass
```

需要有状态组件的话，需在组件中引入react库

```
// App.js
import React from 'react'; // 需要引入react库
import './App.scss';

class App extends React.Component{ // 正常组件，有生命周期
    state = {
        val: '',
        list: [],
    }
    changeHandler = (event)=>{
        this.setState({
            val: event.target.value
        })
        // this.state.val = event.target.value; // 直接赋值input框的输入都输不进去
    }
    add = ()=>{

        this.state.list.push(this.state.val);
        this.setState({
            list: this.state.list
        })
    }
    render(){
        const { val, list } = this.state;
        return <div>
            <input type="text" value={val} onChange={this.changeHandler} />
            <button onClick={this.add} >添加</button>
            <ul>
                {list.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </div>
    }
}


export default App;
```

## AntD
[官网](https://ant.design/docs/react/introduce-cn)

安装

```
npm install antd --save
```
支持按需加载,默认支持基于 ES modules 的 tree shaking。webpack1不支持tree shaking，需要引入babel-plugin-import来支持

```
import { DatePicker } from 'antd';

ReactDOM.render(<DatePicker />, mountNode);
```
引入样式

```
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```

# React-Router
## 路由的基本配置
### BrowserRouter/HashRouter 
history '/'和hash模式 '#'

```
// 定义router.js
import { BrowserRouter as Router, Route } from 'react-router-dom'; // 一定要安装react-router-dom，因为react-router没有link和navlink
import App from './pages/app';
import Home from './pages/home';
import Login from './pages/login';

export default function IRouter(){
    return <Router>
        <Routepath='/' component={App}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/login' component={Login}></Route>
    </Router>
}
```
入口文件index.js中, 引入并渲染router.js

```
import Router from './router';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

```

运行yarn run start, 发现在http://localhost:3000/Login路由下，会把app的组件也匹配上，这时就需要用到Switch组件
### Switch 
4以上的版本才有,根据路由只会匹配一项. 

```
// router.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // 一定要安装react-router-dom，因为react-router没有link和navlink
import App from './pages/app';
import Home from './pages/home';
import Login from './pages/login';

export default function IRouter(){
    return <Router>
        <Switch>
            <Route path='/' component={App}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
        </Switch>
    </Router>
}
```
这时还有问题，它会匹配符合条件的第一项，也就是app组件。那么我们就需要精准匹配
### Route-exact/path/component
精准匹配，Route后加exact

```
<Route exact path='/' component={App}></Route>
```

### Link/NavLink 
标签，路由对跳转的封装,如在app.js中使用Link做路由跳转

```
// app.js
import React from 'react';
import {Link} from 'react-router-dom';
import './app.scss';

export default function App(){
    return <div className="container">
        <h1>react-demo单页应用</h1>
        <Link to='/login'>去登录页</Link>
        <Link to='/home'>去首页</Link>
    </div>
}
```
自定义跳转,需用到有状态组件，在自定义事件中 this.props.history.push('/home')

```
// app.js
import React from 'react';
import {Link} from 'react-router-dom';
import './app.scss';
import {Button} from 'antd';
import 'antd/dist/antd.css';

export default class App extends React.Component {
    jump = ()=>{
        this.props.history.push('/home'); // 跳转
    }
    render(){
        return <div className="container">
            <h1>react-demo单页应用</h1>
            <Link to='/login'>去登录页</Link>
            <Link to='/home'>去首页</Link>
            <Button onClick={this.jump}>自定义跳转去首页</Button>
        </div>
    }
    
}
```


## 路由的动态配置
### 动态detail/productId

```
// router.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // 一定要安装react-router-dom，因为react-router没有link和navlink
import App from './pages/app';
import Home from './pages/home';
import Login from './pages/login';
import Detail from './pages/detail';

export default function IRouter(){
    return <Router>
        <Switch>
            <Route exact path='/' component={App}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/detail/:id' component={Detail}></Route>
        </Switch>
    </Router>
}
```
这时能匹配到 http://localhost:3000/detail/123,但http://localhost:3000/detail是匹配不到的

### redirect/404
#### redirect
将login重定向到首页，引入Redirect模块，在route中应用，to到重定向的页面

```
// router.js
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; // 一定要安装react-router-dom，因为react-router没有link和navlink
import App from './pages/app';
import Home from './pages/home';
import Login from './pages/login';
import Detail from './pages/detail';

export default function IRouter(){
    return <Router>
        <Switch>
            <Route exact path='/' component={App}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/login' component={Login}>
                <Redirect to="/home"></Redirect>
            </Route>
            <Route path='/detail/:id' component={Detail}></Route>
        </Switch>
    </Router>
}
```
#### 404
新建一个NoMatch的404组件，在router最后加*通配符，上面都没有匹配到，就走到这里，展示404页面

```
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; // 一定要安装react-router-dom，因为react-router没有link和navlink
import App from './pages/app';
import Home from './pages/home';
import Login from './pages/login';
import Detail from './pages/detail';
import NoMatch from './pages/404';

export default function IRouter(){
    return <Router>
        <Switch>
            <Route exact path='/' component={App}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/login' component={Login}>
                <Redirect to="/home"></Redirect>
            </Route>
            <Route path='/detail/:id' component={Detail}></Route>
            <Route path='*' component={NoMatch}></Route>
        </Switch>
    </Router>
}
```
## React Hooks & 路由Hooks
解决函数组件无状态的问题
### React Hooks 
16.8版本以上可以用
#### useState
状态的改变和更新
引入useState

```
import React, {useState} from 'react'; // 引入
```
useState(默认值)，返回一个数组，第一个值是状态值，第二个值是更新函数

```
const [count, setCount] = useState(0); // 初始化一个状态,返回一个数组
```
修改状态时，要用箭头函数

```
<Button onClick={() => setCount(count+1)}>次数加1</Button>
```
整体代码：

```
// app.js
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import './app.scss';

export default function App() {
    const [count, setCount] = useState(0); // 初始化一个状态,返回一个数组
    const [count1, setCount12] = useState(10);
    return <div className="container">
        <h1>react-demo单页应用</h1>
        <Link to='/login'>去登录页</Link>
        <Link to='/home'>去首页</Link>
        <p>当前count次数：{count}{count1}</p>
        <Button onClick={() => setCount(count+1)}>次数加1</Button>
        <Button onClick={() => setCount12(count1+1)}>次数加1</Button>
        
    </div>    
}
```

#### useEffect
生命周期hooks，在componentDidMount和componentDidUpdate时调用

可以看到以下console在页面进入执行一次，点击更新后又会执行一次

```
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import './app.scss';

export default function App() {
    const [count, setCount] = useState(0); // 初始化一个状态,返回一个数组
    const [count1, setCount12] = useState(10);
    useEffect(() => {
        console.log('执行了useEffect')
    })
    return <div className="container">
        <h1>react-demo单页应用</h1>
        <Link to='/login'>去登录页</Link>
        <Link to='/home'>去首页</Link>
        <p>当前count次数：{count}{count1}</p>
        <Button onClick={() => setCount(count+1)}>次数加1</Button>
        <Button onClick={() => setCount12(count1+1)}>次数加1</Button>
        
    </div>    
}
```

如果不想在update时更新，useEffect支持第二个参数，传入[],在update时就不会再执行,可以用来调用接口加载数据

```
const [dataList, setDataList] = useState([]); // 初始化接口数据
useEffect(() => {
    console.log('执行了useEffect');
    setCount(100);
    axios.get('./data.json').then(response => {
        const res = response.data;
        setDataList(res.data);
    })
}, [])
```
**注意** useEffect 只能返回一个函数或者undefined，不支持返回promise，内部也不能使用async
#### useContext
在react中子组件传值要靠props，如果子组件非常深，需要一级级传递下去。深度注入，props追泪
React.Context就是用来解决这个问题的。
创建React.context

```
const userContext = React.creatContext();
```
在入口文件用userContext.Provider把子组件包裹起来，value来传值。并需要把userContext导出，供子组件调用

```
// 入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import reportWebVitals from './reportWebVitals';

const username = 'LiMing';
export const userContext = React.createContext(); 

ReactDOM.render(
  <React.StrictMode>
    <userContext.Provider value={username}>
      <Router />
    </userContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
子组件引入userContext，并用userContext.Consumer来消费

```
import React from 'react';
import { userContext } from '../index';

export default function Child(){
    return <div>
        <userContext.Consumer>
            {value => <p> hello, {value}</p>}
        </userContext.Consumer>
    </div>
}
```
使用useContext, 子组件中一样要引入

```
import { userContext } from '../index';
```
在组件代码中const value = useContext(userContext);拿到值直接使用

```
import React, {useContext} from 'react';
import { userContext } from '../index';

export default function Child(){
    const value = useContext(userContext);
    return <div>
        hello,{value}
    </div>
}
```

#### useReducer
useReducer 接受两个参数
useReducer 第一个对state修改函数，它的第一参数是state，第二个deploy
useReducer 第二个参数是state的初始值

解构useReducer，是个素组，第一个元素是state，第二个元素是dispatch，修改state，对应useReducer()调用时传的第一个函数

```
// home.js
mport React, {useReducer} from 'react';
import Child from '../components/child';

const initalState ={
    count: 0,
}
function reducer(state, action){
    switch(action.type){
        case 'increament':
            return {
                count: state.count + 1
            }
        case 'decreament':
            return {
                count: state.count - 1
            }
        case 'reset':
        default:
            return initalState;
    }
}
export default function Home(){
    const [state, dispatch] = useReducer(reducer, initalState);
    return <div>Home
            <Child />
            <p>当前计数：{state.count}</p>
            <button onClick={() => dispatch({type: 'increament'})}>增加</button>
            <button onClick={() => dispatch({type: 'decreament'})}>减少</button>
            <button onClick={() => dispatch({type: 'reset'})}>重置</button>
        </div>
}
```


### Router Hooks
#### useParams
获取参数
在有状态的组件中,this.props.match.params.id

```
// detail.js
import React from 'react';

export default class Detail extends React.Component{
    
    render(){console.log(this)
        return <div>detail
            <p>当前参数id为：{this.props.match.params.id}</p>
        </div>
    }
    
}
```
使用useParams,从react-router-dom包中引入useParams，useParams()就会拿到参数对象

```
// detail.js
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Detail(){
    const params = useParams();
    return <div>detail
        <p>当前参数id为：{params.id}</p>
    </div>
}
```
#### useHistory
操作跳转，在有生命周期的组件中需要用this.props.history.push('/')，在无状态组件中用useHistory，调用useHistory()拿到的就是this.props.history

```
import React from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.css';

import { useParams, useHistory } from 'react-router-dom';

export default function Detail(){
    const params = useParams();
    const history = useHistory();
    return <div>detail
        <p>当前参数id为：{params.id}</p>
        <Button onClick={()=>{
            history.push('/');
        }}>跳转到首页</Button>
    </div>
}
```
