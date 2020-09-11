---
title: IOS滑动引起卡死现象解决及fixed定位元素抖动问题
date: 2020-09-08 20:00:00
tags: 
---
-webkit-overflow-scrolling:touch 使滑动更加顺滑，但他又会引起一系列问题。

问题一：滚动到底部上划触发加载更多，触发IOS回弹，页面卡死。

问题二：点击链接，进入页面，当没有渲染出内容时，手指就不停的往上滑动，内容被渲染出来，手指是一直保持滑动的，但却没有使内容往上移动。

问题三：触发回弹时，header和footer要固定在页面的上部和下部，不能被遮挡。

<!--more-->
困扰我已久，终于有个说的明白的人了！建议先阅读[深入研究-webkit-overflow-scrolling:touch及ios滚动](https://www.cnblogs.com/xiahj/p/8036419.html)，如果未能解决您的问题，接着往下看！

20200911 -------------------------------
20200908发现的解决方案，是能解决问题，但实际操作的时候，还需要精确判断页面渲染完成的时间。增加无谓的消耗。
于是深入研究了一下其它网站（其实是竞品），为什么人家好像也没有特殊处理，反而没有这个bug呢。

以下是实现：

```
<html>
    <body>
        <div class="container">
            <header>
            <div class="content">
                内容
                内容
                很多内容
            </div>
            <footer>
        
```
html和body的height都是100%(比如672px)

header和footer是fixed定位。

container被content撑起来了，比如高度都是3000px;

就是很普通的布局，但为什么我的页面会出现问题呢？

重点来了：

设置content的css，overflow-y和-webkit-overflow-scrolling一定要设置在 content上。

```
content{
    ···
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
```

***
**重点是：
1、overflow-y和-webkit-overflow-scrolling的设置位置是content，并不是body。
2、container body html上都不能设置overflow-y：scroll**

***

然后，问题一二三都解决了。完美！

哦，上文所写的参考文章中动态添加元素啥的，也并没有影响。我的页面中container里的内容都是vue动态渲染的，也不需要设置子元素height为100%+1之类的。但文章依然有参考价值。可以深入了解-webkit-overflow-scrolling，知其然和所以然。

*---------------------------------------
然而，在监听scroll事件拿到scrollTop时，又出现问题……

以上面的布局为例，原来我的overflow-y是写到container(height是100%)上的，这样监听container就可以了。拿container元素的scrollTop就可以了。

现在overflow-y加到了content(height为3000px)上

```
// 可以
document.onscroll = () => { 
    console.log(111);
    console.log(document.body.scrollTop || document.documentElement.scrollTop);
};

// 可以
window.onscroll = () => { console.log(111)
    console.log(document.body.scrollTop || document.documentElement.scrollTop);
};

```
就需要监听document或者window了。


以下为20200908所写 --------------------------------

### 问题三解决：---回弹时header和footer不会被遮挡

header和footer要和滚动元素位于同一级，main设置滚动，并不是滚动body

```
    html, body {
       height: 100%;
      }
      main {
          padding: 50px 0;
          height: 100%;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
      }
      header{
          position:fixed;
          ......
      }
      footer{
          position:fixed;
          ......
      }
```

### 问题二解决：

参考文章 https://www.cnblogs.com/xiahj/p/8036419.html

尝试文中“3.2如果添加动态内容页面不能滚动，让子元素height+1“方法，能解决页面已经渲染出一屏内容，下面的内容加载慢，手指就开始上划，而出现的卡死。

但此情形和问题二还不同，猜测可能是由于所设置的“子元素height+1”子元素都是动态添加原因。

通过测试得知，-webkit-overflow-scrolling设置为auto时，没有回弹，也不会阻碍渲染后页面向上滑动。只有设置了touch才会有这个现象。

因此我的解决方案是页面loading空白时，-webkit-overflow-scrolling设置为auto，当页面渲染完后，设置-webkit-overflow-scrolling为touch。

### 问题一

问题二和问题三解决后，问题一并未复现。能够很顺利的上划加载下一页。

### 参考文章

夏大师 [深入研究-webkit-overflow-scrolling:touch及ios滚动](https://www.cnblogs.com/xiahj/p/8036419.html)

