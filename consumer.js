var conn= require('./libs/mysql.js');
var common= require('./libs/common.js');
var request = require('request');
var config = require('./config.js');
var fs= require('fs');
var hooks = require('./libs/hooks.js');
var FormData = require('form-data');

/**
 * 消费者主要用于发布待发布的微博
 * @type {{}}
 */
var consumer={

};

var weiboToken = {

};

fs.readFile('./token/weibo_token.txt', 'utf8', function (err, txt) {
    //console.log(err,txt);//return;
    if (err) {
        console.log(err+new Date());
        console.log('微博初始化失败');
        return;
    }
//console.log(txt);
    try{
        weiboToken=JSON.parse(txt);
        //console.log('初始化微博分享');
    }catch(e){
        weiboToken={}
    }

});
/**
 * 微博发布消费者
 */
consumer.weibo = function(){

    conn.query(
        {
            sql:"select * from secret_weibo_query where status=0 limit 0,1"
        },function(e,r){
            if(e){
                console.log(e+new Date());
                return;
            }
            console.log(r);
            if(r.length>0){


                //todo 检测是否被举报,如果举报则修改状态

                conn.query(

                    {
                        sql:"select * from secret_post where id="+r[0].postId
                    },function(ee,rr){

                        if(ee){
                            console.log(ee+new Date());
                            return;
                        }

                        if(rr.length>0){

//console.log(rr);

                            request.post('http://text2pic.scuinfo.com',{form:{
                                "text":rr[0].content,
                                "footer":rr[0].nickname+"·"+common.gender(rr[0].gender)+"\n"+common.dayWeibo(rr[0].date*1000)
                            }},function(eeeee,rrrrr,bbbbb){
                                try{
                                    var result = JSON.parse(bbbbb);
                                }catch(e){
                                    console.log(e);
                                    var result = {
                                        code:2009,
                                        message:"json解析出错"
                                    }
                                }
//console.log(result);
                                if(result.code==200){
                                    var form = new FormData();

                                    // var content = ((rr[0].content.substr(0,120)+config.site.url+"/p/"+rr[0].id));
                                     var content = ((rr[0].content.substr(0,135)));

                                    //console.log(encodeURIComponent(content));
                                    form.append('status', encodeURIComponent(content));
                                    form.append('access_token',weiboToken.access_token);
                                    form.append('pic', request(result.data.url));
                                    form.submit('https://upload.api.weibo.com/2/statuses/upload.json', function(err, res) {
                                        // res – response object (http.IncomingMessage)  //
                                        res.resume();

                                        var body = '';
                                        res.on('data', function(chunk) {
                                            //console.log(chunk);
                                            body += chunk;
                                        });
                                        res.on('end', function() {

                                          console.log(body);
                                            try {
                                                var userInfo = JSON.parse(body);
                                            } catch (e) {
                                                var userInfo = {
                                                    error_code: 20000
                                                }
                                            }


                                            if (userInfo.error_code) {
                                                // console.log(userInfo + new Date());


                                                hooks.bearychatIncoming({
                                                    type:"scuinfo同步微博出错",
                                                    title:"错误详情",
                                                    text:JSON.stringify(userInfo)
                                                },function(e){
                                                    if(e){
                                                        console.log(e);
                                                    }
                                                });
                                                return;
                                            }
                                            // console.log(userInfo);
                                            conn.query(
                                                {
                                                    sql: "update secret_weibo_query set status=1,postAt=" + common.time() + ",weiboId=" + userInfo.id + " where id=" + r[0].id
                                                }, function (eeeee, rrrrr) {

                                                    hooks.bearychatIncoming({
                                                        type:"scuinfo新同步微博",
                                                        title:rr[0].nickname+"("+common.gender(rr[0].gender)+")",
                                                        text:rr[0].content
                                                    },function(e){
                                                        if(e){
                                                            console.log(e);
                                                        }
                                                    });

                                                    //console.log(eeeee,'成功发布一条微博');
                                                }
                                            );
                                        });

                                    });


                                }else{


                                    //console.log(result);

                                }

                            });


                        }else{
                            console.log('该帖子已被删除'+new Date());
                            conn.query(
                                {
                                    sql:"update secret_weibo_query set status=3,postAt="+common.time()+" where id="+r[0].id
                                },function(eeeee,rrrrr){
                                    //console.log(eeeee,'成功发布一条微博');
                                }
                            );
                        }

                    }
                );











                //console.log('发布');

            }else{
                //console.log('没有待发布的微博');
            }
        }
    )

};


/**
 * 微信会话销毁
 */

consumer.wechatSession=function(){
    conn.query(
        {
            sql:"delete from wechat_session where createAt<"+(common.time()-10*60)
        },function(e,r){
            //console.log(e,r);
        }
    )

};


consumer.checkStatus = function(){
    var opt1 = {
        url:"http://api.fyscu.com"
    };

    request(opt1,function(e,r){
        if(e || r.statusCode!=200){
            hooks.bearychatIncoming({
                type:"fyscu api 故障"
            },function(e){
                if(e){
                    console.log(e);
                }
            })
        }
    });

    var opt2 = {
        url:"http://scuinfo.com",
        headers:{
            "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36"
        }
    };


    request(opt2,function(e,r,b){
        if(e || r.statusCode!=200){

            console.log(r.statusCode);
            hooks.bearychatIncoming({
                type:"scuinfo.com 访问故障"
            },function(e){
                if(e){
                    console.log(e);
                }
            })
        }
    });



    var opt3 = {
        url:config.queueUrl+"/?name=score&opt=status_json"
    };


    request(opt3,function(e,r,b){
        if(e || r.statusCode!=200){
            hooks.bearychatIncoming({
                type:"队列 访问故障"
            },function(e){
                if(e){
                    console.log(e);
                }
            })
        }else{

            try{
                var data = JSON.parse(b);
            }catch (e){
                var data = null;
            }

            if(data){

                if(data.unread>config.queueMax){
                    hooks.bearychatIncoming({
                        type:"成绩队列没人管了!"
                    },function(e){
                        if(e){
                            console.log(e);
                        }
                    })
                }

            }else{
                hooks.bearychatIncoming({
                    type:"队列body解析错误"
                },function(e){
                    if(e){
                        console.log(e);
                    }
                })
            }

        }
    });



    var opt4 = {
        url:config.queueUrl+"/?name=major&opt=status_json"
    };


    request(opt4,function(e,r,b){
        if(e || r.statusCode!=200){
            hooks.bearychatIncoming({
                type:"队列 访问故障"
            },function(e){
                if(e){
                    console.log(e);
                }
            })
        }else{

            try{
                var data = JSON.parse(b);
            }catch (e){
                var data = null;
            }

            if(data){

                if(data.unread>config.queueMax){
                    hooks.bearychatIncoming({
                        type:"课表队列没人管了!"
                    },function(e){
                        if(e){
                            console.log(e);
                        }
                    })
                }

            }else{
                hooks.bearychatIncoming({
                    type:"队列body解析错误"
                },function(e){
                    if(e){
                        console.log(e);
                    }
                })
            }

        }
    });



    var opt5 = {
        url:config.queueUrl+"/?name=book&opt=status_json"
    };


    request(opt5,function(e,r,b){
        if(e || r.statusCode!=200){
            hooks.bearychatIncoming({
                type:"队列 访问故障"
            },function(e){
                if(e){
                    console.log(e);
                }
            })
        }else{

            try{
                var data = JSON.parse(b);
            }catch (e){
                var data = null;
            }

            if(data){

                if(data.unread>config.queueMax){
                    hooks.bearychatIncoming({
                        type:"图书队列没人管了!"
                    },function(e){
                        if(e){
                            console.log(e);
                        }
                    })
                }

            }else{
                hooks.bearychatIncoming({
                    type:"队列body解析错误"
                },function(e){
                    if(e){
                        console.log(e);
                    }
                })
            }

        }
    });





    var opt6 = {
        url:config.queueUrl+"/?name=renew&opt=status_json"
    };


    request(opt6,function(e,r,b){
        if(e || r.statusCode!=200){
            hooks.bearychatIncoming({
                type:"队列 访问故障"
            },function(e){
                if(e){
                    console.log(e);
                }
            })
        }else{

            try{
                var data = JSON.parse(b);
            }catch (e){
                var data = null;
            }

            if(data){

                if(data.unread>config.queueMax){
                    hooks.bearychatIncoming({
                        type:"续借队列没人管了!"
                    },function(e){
                        if(e){
                            console.log(e);
                        }
                    })
                }

            }else{
                hooks.bearychatIncoming({
                    type:"队列body解析错误"
                },function(e){
                    if(e){
                        console.log(e);
                    }
                })
            }

        }
    });


    var opt7 = {
        url:"http://wechat.scuinfo.com"
    };


    request(opt7,function(e,r){
        if(e || r.statusCode!=404){
            hooks.bearychatIncoming({
                type:"wechat.scuinfo.com 访问故障"
            },function(e){
                if(e){
                    console.log(e);
                }
            })
        }
    });


    var opt8 = {
        url:"http://weibo.scuinfo.com"
    };


    request(opt8,function(e,r){
        if(e || r.statusCode!=404){
            hooks.bearychatIncoming({
                type:"weibo.scuinfo.com 访问故障"
            },function(e){
                if(e){
                    console.log(e);
                }
            })
        }
    });

};

consumer.wechatSession();


setInterval(function(){
    consumer.wechatSession();
},1*60*1000);


consumer.weibo();

setInterval(function(){
    consumer.weibo();
},1*90*1000);


setInterval(function(){
    consumer.checkStatus();
},5*60*1000);
