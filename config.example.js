
/**
 * Created by GuobaoYang on 15/3/8.
 */
var config = {
    urls:{
        wechatSendTemplate:"http://localhost:8120/api/wechat/sendTemplate",
        wechatSendNews:"http://localhost:8120/api/wechat/sendNews"
    },

    /**
     * 点赞数过多少就加入微博发布
     */
    postWeibo:{
      count:1
    },

    localhostUrl:"http://localhost:4150",
    db:"mongodb://localhost:27017/scuinfo-lucky",
   luckyUrl:"http://localhost:3000",
    queueUrl:"http://queue.scuinfo.com",
    queueMax:50,

    api:{
        baseUrl:"http://api.fyscu.com",
        appId:10000,
        appSecret:'scuinfo'
    },

    //api:{
    //    baseUrl:"http://localhost:9231",
    //    appId:10000,
    //    appSecret:'scuinfo'
    //},
    //
    mysql:{
        'host':"127.0.0.1",
        'user':"root",
        password:"123456",
        database:"secret"
    },
    redis:{
      port:6379,
      host:'127.0.0.1'
    },


    /**
     *      * 正式的id和key，请勿必不要在测试环境下使用
     *           */

    wechat:{
        'token':"scuinfoWechat",
        'appId':"wx64902e8505feae7f",
        'appSecret':"xx"
    },


    testWechat:{
        'appId':"wx65f95de25e8b320b",
        'appSecret':"xx",
        'token':"xx"
    },



    wechatWeb:{
        'appId':"wx8f8d7578a5a3023b",
        'appSecret':"xx"
    },
    host:{
        url:"scuinfo.com"
    },

    weibo:{
        'appkey':"1159008171",
        'uid':"3656973697",
        'appSecret':'xx'

    },

    site:{
        name:"scuinfo",
        separator:' - ',
        url:"http://scuinfo.com",
        localhostUrl:"http://localhost:4150",
        urlEncode:"http%3a%2f%2fscuinfo.com"
    },
    week:{
        '7':"周日",
        '6':"周六",
        '5':"周五",
        '4':"周四",
        '3':"周三",
        '2':"周二",
        '1':"周一"
    }
};

module.exports = config;
