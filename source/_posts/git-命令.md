---
title: git 命令
date: 2021-01-20 20:10:50
tags:
---

### git log 
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


#### git log --pretty=oneline
```
f571563b5593893b5daed871fc03575b32133046 (HEAD -> learn_git_branch) Merge branch 'prelive' of code.qschou.com:qschou/h5_fund into prelive
9d51a3471043a39203be9178cbafc98b0e70d71d Merge branch 'feature-73979557-zyj更换项目分享内容' into prelive
ebf3439722718482b1bf283d45cd4ac70c681392 Merge branch 'xc-baodai' into prelive
566971c7776e9b9c699a33b3ecb6f35f35b65e91 (origin/xc-baodai) no message
```

### git diff
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
 
### git reset --hard 恢复文件为HEAD版本

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


### 版本回退



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
#### git checkout -- 文件名
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
    

