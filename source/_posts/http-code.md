---
title: http code
date: 2022-01-18 16:20:16
tags:
---
302，403，405
<!-- more -->

# 302: 暂时性转移(Temporarily Moved)
简单的理解为该资源原本确实存在，但已经被临时改变了位置。就是请求的资源暂时驻留在不同的URI下，故而除非特别指定了缓存头部指示，该状态码不可缓存

场景：打开网站，css样式不生效。查看response，Content-Type: text/html; charset=utf-8。猜测是服务器对非html类型文件设置的content-type不正确

# 403 Forbidden(禁止)

Web客户端发送的请求被Web服务器拒绝了，如果服务器想说明为什么拒绝请求，可以包含实体的主体部分来对原因进行描述。但这个状态码通常是服务器不想说明拒绝原因。

场景：服务器上的文件所属用户与用户组不正确。如：非root用户。可以用chown -R root:root 文件目录来修改目录隶属用户，并用chmod -R 777 文件目录 修改用户、用户组的读写执行权限

# 405 Method Not Allowed 
表明服务器禁止了使用当前 HTTP 方法的请求。需要注意的是，GET 与 HEAD 两个方法不得被禁止，当然也不得返回状态码 405

场景：应该用get方法请求时，使用错误，用了post

