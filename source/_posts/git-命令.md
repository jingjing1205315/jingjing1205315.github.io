---
title: git 命令
date: 2021-01-20 20:10:50
tags:
---
log,diff,reset,checkout

<!-- more -->

# 名词解释（待补充）
## git
## origin
## 工作区
## 缓存区
## 远程库
## origin
## HEAD
# git 命令
## git push
### git push某一次的commit记录

```

$ git push <remote name> <commit hash>:<remote branch name>

# Example:
$ git push origin 2dc2b7e393e6b712ef103eaac81050b9693395a4:master
```
## Git stash
（1）git stash save "save message"  : 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。

（2）git stash list  ：查看stash了哪些存储

（3）git stash show ：显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}

（4）git stash show -p : 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show  stash@{$num}  -p ，比如第二个：git stash show  stash@{1}  -p

（5）git stash apply :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1} 

（6）git stash pop ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}

（7）git stash drop stash@{$num} ：丢弃stash@{$num}存储，从列表中删除这个存储

（8）git stash clear ：删除所有缓存的stash

## git log 
```
commit 96f50451c6f24a221c58c58a8cae136858fed97e (HEAD -> master)
Author: April <zhangyajing1205315@163.com>
Date:   Thu Jan 21 19:57:50 2021 +0800

    change readme.md

commit 347e5597bb222237bc4c61d87a232cfb5ab24916
Author: April <zhangyajing1205315@163.com>
Date:   Thu Jan 21 19:56:37 2021 +0800

    add a readme.md

commit 4d4ddfc6ca37c81b62a576bf47b47144cb63bd3e
Author: April <zhangyajing1205315@163.com>
Date:   Thu Jan 21 19:54:08 2021 +0800

    init

```

这时的git reflog 是

```
96f5045 (HEAD -> master) HEAD@{0}: commit: change readme.md
347e559 HEAD@{1}: commit: add a readme.md
4d4ddfc HEAD@{2}: commit (initial): init

```
(第四条操作)在干净的工作区，git reset --hard 什么也不会发生

(第五条操作）回退一个版本 git reset --hard HEAD^ **（log记录仅剩两条）**

```
commit 347e5597bb222237bc4c61d87a232cfb5ab24916 (HEAD -> master)
Author: April <zhangyajing1205315@163.com>
Date:   Thu Jan 21 19:56:37 2021 +0800

    add a readme.md

commit 4d4ddfc6ca37c81b62a576bf47b47144cb63bd3e
Author: April <zhangyajing1205315@163.com>
Date:   Thu Jan 21 19:54:08 2021 +0800

    init
(END)
```

这时 git reflog 是这样**(用来记录你的每一次命令，保留了所有的log)**

```
347e559 (HEAD -> master) HEAD@{0}: reset: moving to HEAD^
96f5045 HEAD@{1}: reset: moving to HEAD
96f5045 HEAD@{2}: commit: change readme.md
347e559 (HEAD -> master) HEAD@{3}: commit: add a readme.md
4d4ddfc HEAD@{4}: commit (initial): init
```


### git log --pretty=oneline
```
f571563b5593893b5daed871fc03575b32133046 (HEAD -> learn_git_branch) Merge branch 'prelive' of code.qschou.com:qschou/h5_fund into prelive
9d51a3471043a39203be9178cbafc98b0e70d71d Merge branch 'feature-73979557-zyj更换项目分享内容' into prelive
ebf3439722718482b1bf283d45cd4ac70c681392 Merge branch 'xc-baodai' into prelive
566971c7776e9b9c699a33b3ecb6f35f35b65e91 (origin/xc-baodai) no message
```

## git diff
追踪当前**修改**内容。

```
diff --git a/source/_posts/Linux-Command.md b/source/_posts/Linux-Command.md
index b65319c..b53b18d 100644
--- a/source/_posts/Linux-Command.md
+++ b/source/_posts/Linux-Command.md
@@ -9,7 +9,7 @@ tags:
 print working directory
 touch 文件名

-
+### mkdir 新建目录
 
```
 
 新建的文件不会出现在这里。这时的git st 是这样的：
 
```
 On branch gh-pages
Your branch is up to date with 'origin/gh-pages'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   "source/_posts/git-\345\221\275\344\273\244.md"

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   source/_posts/Linux-Command.md
```
 ### git diff commit0 commit1 > test.patch 打patch（待补充）
## git reset --hard 恢复文件为HEAD版本

可以恢复Changes not staged for commit中的文件。

这时**git st**的结果是：

```
n branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        ../../../static/project/reward_rank/css/main_4b080aac.min.css
        ../../../static/project/reward_rank/js/0.4b080aac.lazy.js
        ../../../static/project/reward_rank/js/1.4b080aac.lazy.js
        ../../../static/project/reward_rank/js/2.4b080aac.lazy.js
        ../../../static/project/reward_rank/js/3.4b080aac.lazy.js
        ../../../static/project/reward_rank/js/main_4b080aac.min.js

nothing added to commit but untracked files present (use "git add" to track)

```

# git 操作实例
## 冲突解决
查看暂存区中记录的冲突文件

```
git ls-files -s
```
日志如下：

```
100644 ea9df2ef42c073de18bde4ebdf50e0ac6b1cdd2d 2 README.txt 
100644 633d2ed9d0ae01d0d07136c5b5bd857e4d945c14 3 README.txt 
100644 17874eaa4a398cc94ed294c93fdbf50f7f843d88 0 team/user1.txt 
100644 2dcb7b6ac06d93ea8e6af21ded690f5e171a407c 0 team/user2.txt
```
编号为2表示暂存区用于保存冲突文件在当前分支中修改的副本，查看该文件的内容执行如下命令：

```
git show :2:README.txt
```

编号为3的为暂存区用于保存当前冲突文件在合并版本中修改的副本

```
git show :3:README.txt
```
最后看看工作区的README.txt文件的内容：

```
cat README.txt
```

结果

```
"<<<<<<< HEAD"
Hello, user2.
"======="
"Hello, user1."
“>>>>>>> 04eed972e27e23a9874f984f08d6567e565d3436”
```
手动解决这个冲突

选择我的

```
todo
```
选择他人的

```
todo


```
工作区和暂存区都干净时，都不要了

```
git reset --hard FETCH_HEAD
或
git merge --abort
```
git add -u -u参数表示把工作区被跟踪的文件添加到暂存区

编号都变成0，这样就说明已经成功解决了冲突。



## 版本回退
有两种方式，revert和reset
### git revert -n 版本号
指不要这个提交，其它提交还保留

### git reset --hard 版本号
指回退到这个版本，后面的提交都不要。

在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

```
// 回到前一个版本
$ git reset --hard HEAD^
```

```
// 去到任一版本，cimmit记录的版本号1094a
$ git reset --hard 1094a
```

```
// 所有版本的记录
$ git reflog
```

打包后未add 
出现两部分内容
Changes not staged for commit:（对之前文件的修改）
Untracked files:（新生产的文件）
**git st**

```
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    ../../../static/project/reward_rank/css/main_bdeaeb84.min.css
        modified:   ../../../static/project/reward_rank/index.html
        deleted:    ../../../static/project/reward_rank/js/0.bdeaeb84.lazy.js
        deleted:    ../../../static/project/reward_rank/js/1.bdeaeb84.lazy.js
        deleted:    ../../../static/project/reward_rank/js/2.bdeaeb84.lazy.js
        deleted:    ../../../static/project/reward_rank/js/3.bdeaeb84.lazy.js
        deleted:    ../../../static/project/reward_rank/js/main_bdeaeb84.min.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        ../../../static/project/reward_rank/css/main_4b080aac.min.css
        ../../../static/project/reward_rank/js/0.4b080aac.lazy.js
        ../../../static/project/reward_rank/js/1.4b080aac.lazy.js
        ../../../static/project/reward_rank/js/2.4b080aac.lazy.js
        ../../../static/project/reward_rank/js/3.4b080aac.lazy.js
        ../../../static/project/reward_rank/js/main_4b080aac.min.js

no changes added to commit (use "git add" and/or "git commit -a")

```
### git checkout -- 文件名
-- 文件名 不可少，要不然会变成切换分支
也可以

```
git checkout
```

**下面文字的理解是：checkout 只能恢复没有add的修改**

> --以下来自廖雪峰的git
> 命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

> 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

> 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

> 总之，就是让这个文件回到最近一次git commit或git add时的状态。

1. 如果已经add 了，用git reset HEAD <file>,文件修改保留，只是从暂存区回到了工作区
2. 已commit，用git reset HEAD^ 回退到上一个版本。文件修改保留，修改从仓库回到了工作区
3. git reset HEAD --hard 回到最后一次commit的版本，并且修改不会保留(无论修改是在工作区还是暂存区)(对untrack的修改没有)
4. git rm 只能删除版本库里的文件，对untrack的也没用。untrack文件add进暂存区，可以用git rm 文件名 --catched回到工作区。用git rm 文件名 -f 可以彻底删除文件。
5. git clean -f 清空工作区的untrack,但对not  staged的修改无效。


参考：
[Git 清空工作区和暂存区](https://blog.csdn.net/weixin_43664308/article/details/100083246)
[廖雪峰Git教程](https://www.liaoxuefeng.com/wiki/896043488029600/897271968352576)
    

