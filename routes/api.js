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
    next();
};
api.tags = function (req, res) {
    res.end(common.format(200, "", datas.tag));
};
module.exports = api;