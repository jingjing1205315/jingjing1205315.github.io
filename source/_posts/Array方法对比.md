---
title: Array方法对比
date: 2021-04-12 16:48:40
tags:
---
indexOf ，findIndex() 
includes(), some(), every()
map()
filter()
forEach()
各方法的区别，什么情况下用哪个方法比较好

<!-- more -->

*因为map生成一个新数组，当你不打算使用返回的新数组却使用map是违背设计初衷的，请用forEach或者for-of替代。你不该使用map: A)你不打算使用返回的新数组，或/且 B) 你没有从回调函数中返回值。
------由此总结：

1）需要返回索引，用indexOf ，findIndex() 方法，能用前者不用后者；

2）需要返回布尔，用includes(), some(), every()；

3)  需要返回新数组，只要一个符合条件的新数组用find(),  要多个符合条件的新数组用filter(), 包含所有元素运算出来的新数组用map()；

4）需要循环所有元素，用forEach()

5)  需要循环部分，用for，符合条件，跳出

---------



### 1、for 循环 （for…in  for…of）

1)  in结果是key， of结果是value

2）in 不保证顺序

3）in 是可枚举属性
4)  in 可以是对象

### 2、forEach() & map() ——没有办法中止或跳出 forEach() 循环



forEach() 方法对数组的每个元素执行一次提供的函数。

```
arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);

const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// expected output: "a"

// expected output: "b"

// expected output: “c"
```


map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```
var new_array = arr.map(function callback(currentValue[, index[, array]]) {

 // Return element for new_array 

}[, thisArg])



const array1 = [1, 4, 9, 16];

// pass a function to map

const map1 = array1.map(x => x * 2);

console.log(map1);

// expected output: Array [2, 8, 18, 32]
```


3、every() & some() & find() &filter() —满足条件将不再循环



**every()** 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

```
arr.every(callback[, thisArg])

const isBelowThreshold = (currentValue) => currentValue < 40;



const array1 = [1, 30, 39, 29, 10, 13];



console.log(array1.every(isBelowThreshold));

// expected output: true
```


**some()** 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

```
arr.some(callback(element[, index[, array]])[, thisArg])

const array = [1, 2, 3, 4, 5];

// checks whether an element is even

const even = (element) => element % 2 === 0;

console.log(array.some(even));

// expected output: true
```


**find()** 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

```
arr.find(callback[, thisArg])

const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);

// expected output: 12
```


**filter()** 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

```
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);

// expected output: Array ["exuberant", "destruction", "present"]
```

### 4、indexOf() & findIndex() & includes() & find()

**findIndex()**方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1

```
arr.findIndex(callback[, thisArg])

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));

// expected output: 3
```


**includes()** 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

```
arr.includes(valueToFind[, fromIndex])

const array1 = [1, 2, 3];



console.log(array1.includes(2));

// expected output: true
```


**indexOf()**方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```
arr.indexOf(searchElement[, fromIndex])

var array = [2, 5, 9];

array.indexOf(2);     // 0

array.indexOf(7);     // -1
```


举例：

增信中有includes

春节活动有find

小明的年级排名


字符串实例方法：padStart()

```
(1 +'').padStart(2, ‘0’) // “01”



'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"

'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```


