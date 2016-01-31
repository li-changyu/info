var request = require('request');
var fs = require('fs');
var FormData = require('form-data');
var conn = require('../libs/mysql.js');
var weiboToken = {

};

conn.query(
    {
        sql:"select * from secret_post where id in (select postId from secret_weibo_query where status=0 and postId<:id) order by id desc limit 0," + ":pageSize",
        params:{
            pageSize:2,
            id:6002
        }
    },function(e,r) {
        if (e) {
            console.log(e + new Date());
            return;
        }

        console.log(r);


    });