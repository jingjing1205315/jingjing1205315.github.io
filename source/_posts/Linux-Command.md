---
title: Linux Command
date: 2021-01-14 19:05:45
tags:
---
lsof kill vim, cat, pwd, mkdir,touch, ls, chmod, chown, chgrp
<!-- more -->
---------

# 系统管理
## sudo lsof -i:1025 查看端口1025被什么程序占用（lists openfiles）

```
COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    63350 jing   24u  IPv4 0x506ba2f2071e30df      0t0  TCP localhost:blackjack (LISTEN)
```
杀掉pid未63350的进程

```
sudo kill -9 63350
```

lsof替代了netstat和ps的全部工作

## 命令大全 man lsof

```
lsof abc.txt 显示开启文件abc.txt的进程

lsof -i :22 知道22端口现在运行什么程序

lsof -c abc 显示abc进程现在打开的文件

lsof -g gid 显示归属gid的进程情况

lsof +d /usr/local/ 显示目录下被进程开启的文件

lsof +D /usr/local/ 同上，但是会搜索目录下的目录，时间较长

lsof -d 4 显示使用fd为4的进程 www.2cto.com

lsof -i 用以显示符合条件的进程情况

语法: lsof -i[46] [protocol][@hostname|hostaddr][:service|port]

46 --> IPv4 or IPv6

protocol --> TCP or UDP

hostname --> Internet host name

hostaddr --> IPv4位置

service --> /etc/service中的 service name (可以不只一个)

port --> 端口号 (可以不只一个)

例子: TCP:25 - TCP and port 25

@1.2.3.4 - Internet IPv4 host address 1.2.3.4

tcp@ohaha.ks.edu.tw:ftp - TCP protocol hosthaha.ks.edu.tw service name:ftp

lsof -n 不将IP转换为hostname，缺省是不加上-n参数

例子: lsof -i tcp@ohaha.ks.edu.tw:ftp -n

lsof -p 12 看进程号为12的进程打开了哪些文件

lsof +|-r [t] 控制lsof不断重复执行，缺省是15s刷新

-r，lsof会永远不断的执行，直到收到中断信号

+r，lsof会一直执行，直到没有档案被显示

例子：不断查看目前ftp连接的情况：lsof -i tcp@ohaha.ks.edu.tw:ftp -r

lsof -s 列出打开文件的大小，如果没有大小，则留下空白

lsof -u username 以UID，列出打开的文件 www.2cto.com

```

[参考:Linux 命令神器：lsof](https://www.jianshu.com/p/a3aa6b01b2e1)
# 文件操作
## touch
创建文件 
touch 文件名
## vim .gitignore
编辑文件

## cat .gitignore
查看文件

### pwd（print working directory）

touch 文件名

### mkdir 新建目录
mkdir 目录名



### ls -a
可看到隐藏文件

```
ls -a

.                 .DS_Store         .gitignore        _config.yml       node_modules      package.json      scaffolds         themes
..                .git              .travis.yml       db.json           package-lock.json public            source
```

### ls -l

查看文件权限



```
total 0
drwxr-xr-x  31 jing  staff  992 Jan 14 19:09 _posts
drwxr-xr-x   3 jing  staff   96 Jul  7  2020 about
drwxr-xr-x   3 jing  staff   96 Jul  7  2020 archives
drwxr-xr-x   3 jing  staff   96 Jul  7  2020 categories
drwxr-xr-x   3 jing  staff   96 Jul  7  2020 tags

```
**字段含义：
-文件类型权限
-文件硬链接数（如果是一个目录，则第2字段表示该目录所含子目录的个数。空文件为2，1个目录为指向自己，一个目录为指向附近）
-所属用户
-所属群组
-文件所占用的空间(以字节为单位)
-文件（目录）
-最近访问（修改）时间
-文件名**

**权限：**
drwxr-xr-x/-rwxr-xr-x共10位，第一位代表类型，后面三位一组分别代表：文件拥有者的权限，文件所属组拥有的权限，其他用户拥有的权限

**权限中第一位类型：**

1. d: directory
2. -: 普通文件
3. l: 链接文件link
4. b: 块设备文件(block)一般置于/dev目录下，设备文件是普通文件和程序访问硬件设备的入口，是很特殊的文件。没有文件大小，只有一个主设备号和一个辅设备号。一次传输数据为一整块的被称为块设备，如硬盘、光盘等。最小数据传输单位为一个数据块(通常一个数据块的大小为512字节)
5. c: 字符设备文件(character) 一般置于/dev目录下，一次传输一个字节的设备被称为字符设备，如键盘、字符终端等，传输数据的最小单位为一个字节。
6. p: 命令管道文件。与shell编程有关的文件。
7. s: sock文件。与shell编程有关的文件。


**权限字母其余位字母含义：**
r: read
w: write
x: eXecute

### chmod
**例:对/opt/Oracle/目录下的所有文件与子目录执行相同的权限变更：**

chmod -R(递归) 700(权限) 目录

```
chmod -R 700 /opt/oracle/
```

-R参数是**递归** 处理目录下的所有文件以及子文件夹

700是变更后的权限表示（只有所有者有读和写以及执行的权限）

/opt/oracle/ 是需要执行的目录
### chown
**例:对 /opt/oracle/  目录下的所有文件与子目录执行相同的所有者变更，使所有者修改为oinstall用户组的oracle用户**

chown -R(递归) 用户:用户组 目录

```
chown -R oracle:oinstall /opt/oracle/
```

oracle:oinstall oinstall用户组的oracle，用户组不必须

### chgrp 

chgrp 组名 目录

```
chgrp localaccounts mysql-init
```
# Linux grep 命令用于查找文件里符合条件的字符串。

# tar tape archive 命令用于备份文件
tar 是用来建立，还原备份文件的工具程序，它可以加入，解开备份文件内的文件

压缩文件 非打包

```
# touch a.c       
# tar -czvf test.tar.gz a.c   //压缩 a.c文件为test.tar.gz
a.c
```

列出压缩文件内容

```
# tar -tzvf test.tar.gz 
-rw-r--r-- root/root     0 2010-05-24 16:51:59 a.c
```

解压文件

```
# tar -xzvf test.tar.gz 
a.c
```

