---
title: write bug
date: 2020-12-01 17:48:39
tags:
---
开发中遇到的一些bug

<!--more-->

### IOS手机在微信登录时报redirect_uri错误
原因是redirect_uri长度有限制，可能要求解析后不可超过1024字符。

### 一些布尔值判断转义问题
null == 0 || null >0
=>false
null >= 0
=>true
undefined >= 0
=>false
undefined > 0 || undefined == 0
=>false

