var config = require("../config.js");
var code = require("../libs/code.js");
var conn = require('../libs/mysql.js');
var common = require('../libs/common.js');
var datas = require('../libs/datas.js');
var async = require('async');
var tokenName = 1;
var api = {
    name: "api"
};

api.before = function (req, res, next) {
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    req.session.level=1;
    req.session.userId=888888;
    req.session.avatar="http://img5q.duitang.com/uploads/blog/201504/03/20150403214054_nekQt.jpeg";
    req.session.nickname="我就喜欢语文老师体育能跑100米";
    req.session.gender=2;
    req.session.userStatus='login';
    next();
};
api.tags = function (req, res) {
    res.end(common.format(200, "", datas.tag));
};
module.exports = api;
