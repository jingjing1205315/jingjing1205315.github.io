---
title: vue vue-router vuex
date: 2021-08-10 14:48:12
tags:
---

# vue 

### 父子组件的生命周期
#### 渲染
父 beforeCreated
父 created
父 beforeMounted
子 beforeCreated
子 created
子 beforeMounted
子 mounted
父 mounted
#### 子更新
父 beforeUpdate
子 beforeUpdate
子 updated
父 updated
#### 父更新
父 beforeupdate
父 updated
#### 销毁
父 beforeDestroy
子 beforeDestroy
子 destroyed
父 destroyed


**子组件必须是同步组件，否则子组件生命周期都在父组件之后**
# vue-router

### 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
1. 调用全局的 afterEach 钩子。
2. 触发 DOM 更新。
3. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。


