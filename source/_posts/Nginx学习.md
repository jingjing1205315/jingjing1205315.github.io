---
title: Nginx学习
date: 2021-11-14 22:51:23
tags:
---
Nginx
<!-- more -->
# 启动
sudo nginx

# 重启
sudo nginx -s reload

# 配置

```
user  jing staff;
worker_processes  4;
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       9999;
        #listen       somename:8080;
        server_name  localhost somename  alias  another.alias;

        location / {
            root   /Users/jing/Documents/QAX/nsg/control-plane/service/webauth/webui/;
            index  login.html index.html index.htm;
        }
    }
    
    server {
        listen       8888;
        #listen       somename:8080;
        server_name  localhost somename  alias  another.alias;

        location / {
            proxy_pass http://127.0.0.1:8080;
            index  login.html index.html index.htm;
        }
    }
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;
}
```