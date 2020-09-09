---
title: IOS滑动引起卡死现象解决
date: 2020-09-08 20:00:00
tags: 
---
-webkit-overflow-scrolling:touch 使滑动更加顺滑，但他又会引起一系列问题。

问题一：滚动到底部上划触发加载更多，触发IOS回弹，页面卡死。

问题二：点击链接，进入页面，当没有渲染出内容时，手指就不停的往上滑动，内容被渲染出来，手指是一直保持滑动的，但却没有使内容往上移动。

问题三：触发回弹时，header和footer要固定在页面的上部和下部，不能被遮挡。

<!--more-->
困扰我已久，终于有个说的明白的人了！建议先阅读[深入研究-webkit-overflow-scrolling:touch及ios滚动](https://www.cnblogs.com/xiahj/p/8036419.html)，如果未能解决您的问题，接着往下看！

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

