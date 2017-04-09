# scuinfo
3.0

## 需要具备的一些基础

1. linux基本使用
2. vi的使用
3. javascript,nodejs基础,mysql基础
4. webpack构建工具


## 部署前的准备：

1. 注册域名
2. 购买服务器，阿里云，并备案
3. 注册微信公众号的服务号，并认证
4. 在微信开放平台(open.weixin.qq.com)注册并认证，添加网站应用后提交审核。
5. 注册微博，注册微博开发者open.weibo.com
6. 注册git.oschina.net ,代码管理平台。
6. 在服务器部署（mysql,mongoddb,redis,nginx,nodejs)
7. 注册bearychat,用于即时推送服务器消息，微博推送消息
8. 在域名注册商那里将域名解析到你买的服务器ip地址上
7. 上线。


### 服务器环境问题
1. 安装nginx(https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-14-04-lts)
2. 安装mysql(https://www.linode.com/docs/databases/mysql/install-mysql-on-ubuntu-14-04/)
3. 安装nodejs(https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
4. 安装redis-server(https://www.digitalocean.com/community/tutorials/how-to-configure-a-redis-cluster-on-ubuntu-14-04)
5. 安装mongodb(https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04)
6. 配置nginx，把请求分配到某个端口

    ```
    vi /etc/nginx/conf.d/info.conf
    ```
    然后把下面的配置粘贴进去:
    ```
    server {
        listen 80;
	server_name  swfeinfo.com;
	location = / {
                rewrite ^/$ /dist/index.html last;
        }
	location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://127.0.0.1:4150;
         }
	location ^~ /dist {
		root /data/src/scuinfo-client;
		index index.html;
	}
	location /v3/ {
		proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://127.0.0.1:4150/;
	}
}
    ```
7. 导入数据库

```
//先把sql文件传到服务器

mysql -u username -p database_name < file.sql
```
8. 安装git
9.
## 部署scuinfo后端服务


        git clone git@git.oschina.net:xiaomingplus/scuinfo.git
        cd scuinfo
        npm install -g cnpm --registry=https://registry.npm.taobao.org
        cnpm i   
        cnpm i pm2 -g
        cp config.example.js config.js  //随后修改config文件内的相关配置
        导入mysql数据库

        chmod -R 777 token/

1. 更改根目录下的config.example.js 为 config.js

2.给token/ 775的权限

3. 更改/token 下各个带example的文件,去掉example


## 更新，如何支持emoji
1. 修改数据库表或者字段的字符集为utf8mb4，修改的sql语句如下：
- 修改整库的字符集

```
ALTER DATABASE database_name CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
```
- 修改整张表的字符集

```
ALTER TABLE haviea.share_article_comment CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
- 修改单个字段的字符集
```
ALTER TABLE table_name CHANGE src_column_name target_column_name VARCHAR(600) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
2.修改mysql配置文件设置字符集和跳过客户端设置。添加的配置项如下：
```
[mysqld]
character-set-server=utf8mb4
init-connect='set names utf8mb4'
skip-character-set-client-handshake
```



项目地址:http://scuinfo.com

分为web系统/微信服务/通知中心/微博服务/消费者（定时检测任务）

以下为通知中心的api约定:

0.0 只允许本机用户调用

0.1 api基础网址:```http://localhost:8120```
### 1.发送微信客服图文消息通知（48小时内有过回复）


    {
    method:"post",
    header:{
    "Content-Type":"Application/json"
    },eng
    url:"/api/wechat/sendNews",
    params:
    {
             "openId":"orJ8DjwvPDnWzhoVEVSc-T0Q60Fo",
             "articles":[{
               "title":"标题",
               "description":"描述",
               "picUrl":"图片地址",//可以为空
               "url":"图文网址"
             }]

           }


    },
    return:{
        code:200
        }

    }


### 2.发送微信客服文本消息通知（48小时内有过回复）


    {
    method:"post",
    header:{
    "Content-Type":"x-www-form-urlencoded"
    },
    url:"/api/wechat/sendText",
    params:
    {
             "openId":"orJ8DjwvPDnWzhoVEVSc-T0Q60Fo",
             "content":"文本"        
           }
    },
    return:{
        code:200
        }

        }



### 3.发送微信模板消息通知（每天只允许发10w次）


    {
    method:"post",
    header:{
    "Content-Type":"x-www-form-urlencoded"
    },
    url:"/api/wechat/sendTemplate",
    params:
    {
             "openId":"orJ8DjwvPDnWzhoVEVSc-T0Q60Fo",
             "template":"ok",//fail 目前仅有ok,fail两种模板
             "first":"标题",
             "keyword1":"服务编号",
             "keyword2":"服务类型",
             "keyword3":"服务内容",
             "keyword4":"进度情况",
             "remark":"说明"      
           }
    },
    return:{
    code:200
    }

    }




以下为scuinfo的web系统api约定:


0.0 先不管用户系统，把userId默认为1即可

0.1 所有变量命名采用小驼峰法,类似 userId

0.2 utf8

0.3 需要登录的接口都会有get参数:token=xxxxxxxx ,通过token判断是否登录

0.4 接口统一返回格式:

	{
	code:200,    //成功则为0,失败为相应的错误码
	message:"提示信息",  //成功可省略,失败为错误提示信息
	data:{}     //可以为空
	}

0.5 匿名如果在评论区的话，可识别为作者

0.6 同一个帖子下,作者只能为一种身份 实名/匿名

0.7 实名不可转匿名，反之可以

0.8 判断title

0.9 基础api地址:```http://scuinfo.com```

### 1.新增一个帖子接口

    //如果是匿名的情况下，插入一个随机的avatar,和一个昵称 '某同学'
	{
	method:"post"

	url:"/api/post"

	params:{
	secret:0/1 //是否匿名
	content:"内容"
	}

	}


### 2.删除一个帖子接口

	{
	method:"delete"
	url:"/api/post"
	params:{
	id:2
	}
	}

### 3.帖子列表

    {
    method:"get",
    url:"/api/posts"
    params:{
    pageSize:15 //请求的文章数
    fromId:53  //从第53个文章id往前的15篇文章
    userId:23 //如果有这个字段则返回 该人的帖子列表
    //待定参数

    }
    }

    return:{
    code:0,
    data:[

    {
    id:12,
    top:0/1 ,//是否置顶
    title:"xxx",
    gender:0/1 ,  //性别
    avatar:""  , //头像
    nickname:"" ,//昵称
    secret:"0/1",
    more:"0/1",//是否有更多内容
    like:"0/1",//如果点过赞则为1
    author:"0/1",
    admin:"0/1",
    commentCount:13 ,//评论数量
    likeCount:12 ,//点赞数量
    date:12343214321,  //时间戳
    userId:0/3  //作者id，如果是实名则返回作者id，否则为0
    }
    ]

    }
    }

### 4.帖子详情

    {
    method:"get",
    url:"/api/post",
    params:{
    id:12
    }
    }

    return:

    {
        id:12,
           title:"xxx",
           gender:0/1 ,  //性别
           avatar:""  , //头像
           nickname:"" ,//昵称
           secret:"0/1",
           more:"0/1",//是否有更多内容
           like:"0/1",//如果点过赞则为1
           author:"0/1",
           admin:"0/1",
           commentCount:13 ,//评论数量
           likeCount:12 ,//点赞数量
           date:12343214321,  //时间戳
           userId:0/3  //作者id，如果是实名则返回作者id，否则为0
        }

### 5.发布一条评论

    {
    method:"post"
    url:"/api/comment"
    params:{
    postId:3,
    secret:true/false,//是否匿名
    parentId:"",//父id，如果直接评论，则默认0，若回复某个评论则为某评论的id
    content:"评论内容"
    }
    }

### 6.删除一条评论
	{
	method:"delete"
	url:"/api/comment",
	params:{
	id:23
	}
	}


### 7.评论列表


    {
    method:"get",
    url:"/api/comments"  //文章
    params:{
    postId:12，
    pageSize:15 //请求的评论数
    fromId:从第几条起的评论


    //待定参数

    }

    return:{
    code:200,
    data:[
    {
    id:23,
    parentId:22,
    isAuthor:0/1, //是否为作者
    admin:"0/1",
    postId:1,
    content:"xxxxxx",
    date:12314321432,
    secret:0/1,  //是否匿名
    like:0/1,   //是否赞过
    userId:0/3
    avatar:"",
    nickname:"",
    gender:""
    likeCount:2 //点赞数量


    }

    ]
    }
    }

### 8.评论详情


    {
    method:"get",
    url:"/api/comment",
    params:{
    id:322  //评论id

    }

    return:

       {
        id:23,
            parentId:22,
            isAuthor:0/1, //是否为作者
            admin:"0/1",
            postId:1,
            content:"xxxxxx",
            date:12314321432,
            secret:0/1,  //是否匿名
            like:0/1,   //是否赞过
            userId:0/3
            avatar:"",
            nickname:"",
            gender:""
            likeCount:2 //点赞数量

        }
    }

### 9.给某帖子点赞
    {
    method:"post",
    url:"/api/like/post"
    params:{
    id:12
    }
    }

### 10.给某评论点赞
    {
    method:"post",
    url:"/api/like/comment",
    params:{
    id:"3"
    }
    }
### 9.1.给某帖子取消点赞
    {
    method:"delete",
    url:"/api/like/post",
    params:{
    id:"3"
    }
    }

### 10.1.给某评论取消点赞
    {
    method:"delete",
    url:"/api/like/comment",
    params:{
    id:"3"
    }
    }
### 11.帖子匿名转实名

    //同一帖子下的该作者的评论都转为实名

    {
    method:"put",
    url:"/api/status/post",
    params:{
    id:"2"
    }
    }

### 12.评论匿名转实名


    //同一个帖子下的该作者的所有评论均转为实名

    {
    method:"put",
    url:"/api/status/comment",
    params:{
    id:"2"
    }
    }

### 13.标签列表
    {
    method:"get",
    url:"/api/tags,
    params:{

    pageSize:15,
    fromId:"2"

    }
    return;{
    code:200,
    data:[

    {id:1,
     name:'test1'},
      {id:2,
          name:'test2'},
           {id:3,
               name:'test3'},
                {id:4,
                    name:'test4'}

     ]
    }
    }

### 14.标签查找帖子列表
    {
    method:"get",
    url:"/api/tag",
    params:{

    name:"test1",
    pageSize:15,
    fromId:2

    }


     return:{
        code:0,
        data:[

        {
        id:12,
            title:"xxx",
            gender:0/1 ,  //性别
            avatar:""  , //头像
            nickname:"" ,//昵称
            secret:"0/1",
            admin:"0/1",
            more:"0/1",//是否有更多内容
            like:"0/1",//如果点过赞则为1
            author:"0/1",
            commentCount:13 ,//评论数量
            likeCount:12 ,//点赞数量
            date:12343214321,  //时间戳
            userId:0/3  //作者id，如果是实名则返回作者id，否则为0
        }
        ]

        }
    }

### 15.赞过的帖子接口

     {
     method:"get",
     url:"/api/posts/like"
    params:{
    pageSize:15 //请求的文章数
    fromId:53  //从第53个文章id往前的15篇文章
    userId:23  //如果不传的话，默认使用当前登录的用户的id
    /待定参数

    }
    }

    return:{
    code:0,
    data:[

    {
        id:12,
            title:"xxx",
            gender:0/1 ,  //性别
            avatar:""  , //头像
            nickname:"" ,//昵称
            secret:"0/1",
            more:"0/1",//是否有更多内容
            like:"0/1",//如果点过赞则为1
            author:"0/1",
            admin:"0/1",
            commentCount:13 ,//评论数量
            likeCount:12 ,//点赞数量
            date:12343214321,  //时间戳
            userId:0/3  //作者id，如果是实名则返回作者id，否则为0
        }
    ]

    }


### 16.某某某的个人数据

    {
     method:"get",
     url:"/api/profile/"
    params:{
    userId:23  //如果没有此参数，则返回当前登录用户的个人数据，如果没有登录，则返回错误{"xxx":"请先登录"}
    //待定参数

    }
    }

    return:{
    code:200,
    data:

    {
        postsCount:21 //发布的文章总数
        likePostsCount:23 //赞过的文章总数
        avatar:"http://xxx.jpg",
        nickname:"小米",
        gender:"0"

        /*待定的
        scenes:[
        {
        'key':"score",
        'name':"成绩"

        }
        ],
        myScenes[
        'score'
        ]
        */

        }


    }

### 17.获取某个标签的文章数

        {
         method:"get",
         url:"/api/tag/count"
        params:{
        name: //标签名
         start://时间戳  可选，开始的时间戳
         end://时间戳 可选，结束的事件戳
        }
        }

        return:{
        code:200,
        data:

        {
            postsCount:21 //文章总数

            }


        }

### 18.获取当前登录用户的通知数

        {
        method:"get",
        url:"/api/notice/count",

        params:{

        type:"all"  //默认是all

        },

        return:{

        code:200,

        data:{

        likeCount:12,
        replyCount:13,
        count:25

        }

        }

        }

### 19.获取当前登录用户的通知列表

        {
        method:"get",
        url:"/api/notices",
        params:{
        fromId:1,
        pageSize:10,
        type:"all,like,reply"  //默认是all
         },
         return:{
         code:200,
         data:[
         {
          userId:"adsfsadfsadf" ,
          authorId:"2",
          nickname:"小明",
          action:"replyPost,replyComment,likePost,likeComment",
          content:"『三天之内必有血光之灾』",
          originContent:"你妈炸了",
          postId:32,  //回复的帖子id
          status:1  //1为未读,0为已读
          [
          //根据类型
          parentCommentId:321,   //仅类型为 replyComment,likeComment 有
          commentId:32,    //仅类型为  replyPost,replyComment有
          ]
          }
          ]
          }
          }


### 20.标记通知为已读，未读状态

          {
          method:"get",
          url:"/api/notice/status"
          params:{
          type:"single,multiply,all",single为单条通知,multiply为多条通知,all为全部通知,默认为single,
          id:"23" //需要标记的通知id 如果为 multiply则为数组，如果为 all 则无，
          action:"0/1",1为标为未读，0为已读
          }
          return:{
          code:200
          }
          }

### 21.绑定学号密码

          {
          method:"post",
          url:"/api/bind/dean",
          params:{
          studentId:"学号",
          password:"密码"
          }
          }


### 22.举报不良内容

          {
          method:"post",
          url:"/api/report",
          params:{
          postId:"reports",
          content:"举报描述"
          }
        return:{
        code:200
        }
        }

### 23.审核列表

        {
                  method:"get",
                  url:"/api/reports",
                params:{
                fromId:22222, //从那篇起
                pageSize:15, //每页多少篇
                },
                return:{
                code:200
                }
                }

### 24.删除帖子并封禁该用户

        {
        method:"post",
        url:"/api/delete_blacklist",
        params:{
        userId:2,
        postId:23232,
        content:"理由"
        },
        return:{
        code:200
        }
        }

### 25. 审核确定没问题

        {
        method:"post",
        url:"/api/no_question",
        params:{
        id:"22",//审核id
        content:"xxx" //理由
        },
        return:{
        code:200
        }
        }
### 26.我发布的帖子列表

        {
                method:"get",
                url:"/api/posts/self",
                params:{
                fromId:22222, //从那篇起
                pageSize:15, //每页多少篇
                },
                return:{
                code:200
                }
                }

### 27.登录

    登录的url是
    /login?type=wechat&redirect={url}
    支持hash
    type有3个值:wechat,wechatWeb,weibo

### 28.通过帖子拉黑
    {
        method:"post",
        url:"/api/block",
        params:{
            id:222,//文章id
            blockTime:1233333,//多少秒之后杰出封禁
            reason:"理由",封禁理由
        },
        return :{
            code:200
        }
    }

### 29.白名单
    {
        method:"post",
        url:"/api/white",
        params:{
            id:222,//文章id
        },
        return :{
            code:200
        }
    }
### 30.通过评论拉黑
    {
        method:"post",
        url:"/api/comment/block",
        params:{
            id:222,//评论id
            blockTime:1233333,//多少秒之后杰出封禁
            reason:"理由",封禁理由
        },
        return :{
            code:200
        }
    }
### 31.通过帖子解除拉黑
    {
        method:"post",
        url:"/api/unblock",
        params:{
            id:222,//文章id
        },
        return :{
            code:200
        }
    }
### 32.通过评论解除拉黑
    {
        method:"post",
        url:"/api/comment/unblock",
        params:{
            id:222,//评论id
        },
        return :{
            code:200
        }
    }
