
/**
 * Created by GuobaoYang on 15/3/8.
 */
var config = {
    urls:{
        wechatSendTemplate:"",//微信模板发送地址
        wechatSendNews:"" //微信图文消息发送地址
    },

    /**
     * 点赞数过多少就加入微博发布
     */
    postWeibo:{
      count:1
    },

    localhostUrl:"http://localhost:4150", //本地网址
    db:"", //mongodb地址
    luckyUrl:"", //lucky本地网址

    api:{
        baseUrl:"http://api.fyscu.com",
        appId:10000, //飞扬appId
        appSecret:'' //飞扬apisecret
    },

    mysql:{
        'host':"127.0.0.1",
        'user':"root",
        password:"123456",
        database:"secret"
    },

    /**
     *      * 微信公众号正式的id和key，请勿必不要在测试环境下使用
     *           */

    wechat:{
        'token':"",
        'appId':"wx64902e8505feae7f",
        'appSecret':""
    },


    wechatWeb:{
        'appId':"wx8f8d7578a5a3023b",
        'appSecret':"" //微信网页版
    },
    host:{
        url:"scuinfo.com"
    },

    weibo:{
        'appkey':"1159008171",
        'uid':"3656973697",
        'appSecret':'' //微博

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
