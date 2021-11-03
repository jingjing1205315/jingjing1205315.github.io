---
title: css ctrl+c、ctrl+v
date: 2021-08-12 18:21:58
tags:
---

长按不选中 多行省略


<!--more-->

# 长按不选中


```
div{
    -webkit-touch-callout:none; 
    -webkit-user-select:none; 
    -moz-user-select:none; 
    -ms-user-select:none; 
    user-select:none; 
}
```
# 多行省略

```
display: -webkit-box;
-webkit-box-orient: vertical!important;
-webkit-line-clamp: 2;
max-height: 3em;
overflow: hidden;
text-overflow: ellipsis;
```

