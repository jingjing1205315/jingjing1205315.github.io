---
title: JS类型转换
date: 2021-11-05 22:28:03
tags:
---
隐式类型转换：1、== 2、if条件

<!--more-->

# 强制类型转换

# 隐式类型转换
## == 隐式类型转换
### String、Number与Boolean本质是不同类型都转为**数字**去比较
```
0 == false // true
'' == false // true
'0'==false // true
'' == '0' // false
1 == '1' // true
```
假如，不同类型与boolean比较转化为boolean来比较，那么第三个就应该为false,因为!!'0'为true；
假如，转化为字符串比较，那么false转化为'false',那么1，2，3都未false；
以上这些，说明不同类型==比较时，会隐式转化为数字来进行比较

### 对象与基础类型
#### String类型

```
'a' == ['a'] // true
'[object Object]' == {} // true
```
首先调用对象['a'].toString() // 'a' ，因此 == 成立；
({}).toString() // '[object Object]', 因此 '[object Object]' == {} 也成立
#### Number与Boolean

```
[]==![] // true
```
也就是 [] == false; Number([]) 为0，Number(false)也为0，**成立！**
Number([])涉及到的类型转化应为[].toString() // '', 然后Number('')为0

```
({}) == false // false
```
Number({}) 为NaN，Number(false)为0，**不成立！**
Number({})涉及到的类型转化应为({}).toString() // '[object Object]', 然后Number('[object Object]')为NaN

#### undefined 与 null

```
null == null // true
undefined == undefined // true
undefined == null  // true
0 == null  // false
'' == null // false
'' == undefined // false
0 == undefined // false
false == null // false
false == undefined // false
true == null // false
true == undefined  //false
```
即使 Number(undefined) 为 NaN， Number(null) 为 0，可以看到undefined和null并不能再==运算时，遇到String、Number及  Boolean 做隐式类型转化 

#### NaN

```
NaN == NaN  // false
NaN == false // false
NaN == true  // false
NaN == undefined // false
NaN == null   //false
NaN == '' // false
NaN == 0 // false
```

## If条件与!!

```
Boolean(NaN) // false
Boolean(undefined) // false
Boolean(null) // false
Boolean('') // false
Boolean('0') // false
Boolean(0) // false
Boolean([]) // true
Boolean({}) // true

```