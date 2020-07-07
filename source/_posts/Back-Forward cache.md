---
title: 'Back-Forward cache'
date: 2020-07-06 20:00:00
tags: 
---

往返缓存（Back/Forward cache，下文中简称bfcache）是浏览器为了在用户页面间执行前进后退操作时拥有更加流畅体验的一种策略。该策略具体表现为，当用户前往新页面时，将当前页面的浏览器DOM状态保存到bfcache中；当用户点击后退按钮的时候，将页面直接从bfcache中加载，节省了网络请求的时间。

<!--more-->
往返缓存（Back/Forward cache，下文中简称bfcache）是浏览器为了在用户页面间执行前进后退操作时拥有更加流畅体验的一种策略。该策略具体表现为，当用户前往新页面时，将当前页面的浏览器DOM状态保存到bfcache中；当用户点击后退按钮的时候，将页面直接从bfcache中加载，节省了网络请求的时间。

比如：二级页面有用户操作行为导致的状态变更，我们希望回退时一级页面有相应的体现。这时希望浏览器不要展现缓存页面。

**解决方案：**根据[浏览器往返缓存（Back/Forward cache）问题的分析与解决](https://github.com/LeuisKen/leuisken.github.io/issues/6)，尝试用worker，无效果。

回退会触发：

```
window.addEventListener('pageshow', event => {
  if (event.persisted) {
    window.location.reload();
  }
});
```
这样页面会重新加载，但缓存的页面会闪现一下。如果页面有load动画，动画在闪现的缓存页面也会执行。

**解决方案：**首页进入页面，动画执行完，移除动画dom，这样回退的时候，在缓存的页面就不会有动画。

**完美方案：**缓存页面不闪现。（未解决）




