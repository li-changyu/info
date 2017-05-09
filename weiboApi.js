var weiboApi= {

};
var request= require('request');
var fs = require("fs");
weiboApi.createButton = function(){
fs.readFile("./token/weibo_token.txt",{
"encoding":"utf8"
},(err,data)=>{
console.log('err',err,data)
var weiboAuth = data;
console.log(weiboAuth)
var access_token=JSON.parse(weiboAuth).access_token;
   var url='https://m.api.weibo.com/2/messages/menu/create.json';
   var menu= {
        "button": [
            {
                "name":"服务",
                "sub_button":[
                    //{   type:"view",
                    //    "name":"历史消息",
                    //    "url":"http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MjM5OTM3OTM3Mg==#wechat_webview_type=1&wechat_redirect"
                    //
                    //},
//                    {   type:"click",
//                        "name":"神奇海螺",
//                        "key":"fm"
//
//                    },
//                    {
//                        type:"click",
//                        "name":"匿名发帖",
//                        "key":"post"
//                    },
//                    {
//                        type:"click",
//                        "name":"我要表白",
//                        "key":"love"
//                    },
                    //{
                    //    type:"view",
                    //    "name":"跳蚤市场",
                    //    "url":"http://xiaoqu.qq.com/mobile/barindex.html?_bid=128&_wv=1027&bid=130899"
                    //},

//                    {
//                        type:"view",
//                        "name":"空闲教室",
//                        "url":"http://scuinfo.com/classroom"
//                    },
                    {
                        type:"click",
                        "name":"联系我们",
                        "key":"advise"
                    }

                    /*
                     {
                     "type":"click",
                     "name":"川大新闻",
                     "key":"news"
                     },
                     {
                     "type":"click",
                     "name":"川大讲座",
                     "key":"lecture"
                     },
                     {

                     "type":"click",
                     "name":"川大就业",
                     "key":"jobs"
                     }
                     */
                ]
            },
            {
                "type":"view",
                "name":"swfeinfo",
                "url":"http://swfeinfo.com"
            },
            {
                "name":"我的",
                "sub_button":[
                    /*
                     {
                     "type":"click",
                     "name":" 消息中心 ",
                     "key":"notice"
                     },
                     */
//                    {
//                        "type":"click",
//                        "name":"成绩查询 ",
//                        "key":"score"
//                    },
                    //{
                    //    "type":"click",
                    //    "name":"考试查询",
                    //    "key":"exam"
                    //},

//                    {
//                        "type":"click",
//                        "name":"补考缓考",
//                        "key":"examAgain"
//                    },
//                    {
//                        "type":"click",
//                        "name":"图书借阅 ",
//                        "key":"book"
//                    },
//                    {
//                        "type":"click",
//                        "name":"课表查询 ",
//                        "key":"major"
//                    },
                    {
                        "type":"view",
                        "name":"我的主页 ",
                        "url":"http://swfeinfo.com/u"
                    }

                ]
            }]
    };

    var menu1={
        "button": [
            {
                "type": "click",
                "name": "获取优惠券",
                "key": "get_groupon"
            },
            {
                "type": "click",
                "name": "查询客服电话",
                "key": "the_big_brother_need_your_phone"
            },
            {
                "name": "菜单",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "网上4S店",
                        "url": "http://apps.weibo.com/1838358847/8rYu1uHD"
                    },
                    {
                        "type": "view",
                        "name": "砍价团",
                        "url": "http://apps.weibo.com/1838358847/8s1i6v74"
                    },
                    {
                        "type": "click",
                        "name": "么么哒",
                        "key": "memeda"
                    }
                ]
            }
        ]
    };


    //console.log((JSON.stringify(menu1)));

    var xx=JSON.stringify(menu);
    console.log('json',xx)
    console.log(encodeURIComponent(xx));
console.log("url",url+"?access_token="+access_token)   
 request.post(
        {
            url:url+"?access_token="+access_token,
            form:{
		menus:xx
            }
        },function(e,r,b){
            console.log(e,b);
        }
    )
})
};

weiboApi.createButton();
