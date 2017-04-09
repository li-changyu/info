var check = require('../libs/check.js');
var common = require('../libs/common.js');
var code = require('../libs/code.js');
var async = require('async');
var conn = require('../libs/mysql.js');
var datas = require('../libs/datas.js');
//var tokenName = 1;
var notice = {

    name:"通知处理页"
};

notice.count = function (req,res) {
    //console.log('xxx');
    if(req.session.userId){
        if(!req.query.type){
            req.query.type = 'all';
        }
        var data={};
        //console.log(sql, fff);return;
        conn.query(
            {
                sql:'select count("id") from `secret_notice` where status=1 and pattern in (1,3) and authorId ='+req.session.userId
            },function(e,r){
                if(e){
                    console.log(e);
                    res.end(JSON.stringify(code.mysqlError));
                    return;
                }
                conn.query(
                    {
                        sql:'select count("id") from `secret_notice` where status=1 and pattern in(2,4) and authorId ='+req.session.userId
                    },function(ee,rr){
                        if(e){
                            console.log(e);
                            res.end(JSON.stringify(code.mysqlError));
                            return;
                        }
                        data.likeCount = r[0]['count("id")'];
                        data.replyCount = rr[0]['count("id")'];
                        data.count = r[0]['count("id")'] + rr[0]['count("id")'];
                        res.end(common.format(200,"success",data));
                    }
                );

            }
        )}else{
        // console.log('你没有登陆');
        res.end(JSON.stringify({
            code:2015,
            message:"没有登录"
        }))
        return;
    }
};

notice.list = function (req, res) {
    var pageSize,page;
    if (!req.query.pageSize) {
      pageSize = 15
  }else{
      pageSize = Number(req.query.pageSize);
  }
    if(req.session.userId){
        //console.log('xxx');
        if(!req.query.type){
            req.query.type = 'all';
        }
        var sql='';
        switch(req.query.type){
            case 'all':
                sql='select * from secret_notice where authorId = :authorId ';
                break;
            case 'like':
                sql='select * from secret_notice where pattern in (2,4) and authorId = :authorId';
                break;
            case 'reply':
                sql='select * from secret_notice where pattern in (1,3) and authorId = :authorId';
                break;
        }
        if(req.query.fromId){
            sql += ' and id<' + ':id' ;
        }
        sql += ' order by id desc limit 0,:pageSize';
        // console.log(sql);
        conn.query(
            {
                sql:sql,
                params:{
                    authorId:req.session.userId,
                    id:req.query.fromId,
                    pageSize:pageSize
                }
            }, function (e,r) {
                if(e){
                    console.log(e);
                    res.end(JSON.stringify(code.mysqlError));
                    return;
                }
                var datas=[];

                //console.log(r[0].userId);return;
                for(var i=0;i< r.length;i++){
                    var data ={};
                    //console.log(r[i].userId);return;
                    data.userId = r[i].userId;
                    data.authorId = r[i].authorId;
                    data.nickname = r[i].nickname
                    switch (r[i].pattern){
                        case 1:
                            data.action='likePost';
                            delete data.nickname;
                            break;
                        case 2:
                            data.action='replyPost';
                            data.commentId=r[i].commentId;
                            break;
                        case 3:
                            data.action='likeComment';
                            data.parentCommentId=r[i].parentCommentId;
                            delete data.nickname;
                            break;
                        case 4:
                            data.action='replyComment';
                            data.commentId=r[i].commentId;
                            data.parentCommentId=r[i].parentCommentId;
                            break;
                    }
                    data.content = r[i].content;
                    data.originContent = r[i].originContent;
                    data.postId = r[i].postId;
                    data.status = r[i].status;
                    data.id = r[i].id;
                    data.date = r[i].date;
                    datas.push(data);
                    //console.log('xxx');
                }
                res.end(common.format(200,'success',datas));

            }
        )
    }else{
        console.log('你没有登录');
        res.end(JSON.stringify(code.loginError));
        return;
    }
};

notice.change = function (req, res) {
    if(req.session.userId){
        if(req.query.action=='0'||req.query.action=='1'){
            if(!req.query.type){
                req.query.type='single';
            }
            var sql='';
            switch(req.query.type){
                case 'single':
                    sql='update secret_notice set status='+":action"+' where id=:id and authorId=:userId';
                    break;
                case 'multiply':
                    var a = req.query.id.join(",");
                    sql='update secret_notice set status=:action where id in('+a+') and authorId=:userId';
                    break;
                case 'all':
                    sql='update secret_notice set status=:action where authorId=:userId';
                    break;
            }
            conn.query(
                {
                    sql:sql,
                    params:{
                        userId:req.session.userId,
                        id:parseInt(req.query.id),
                        action:req.query.action
                    }
                }, function (err,rows) {
                    if(err){
                        console.log(err);
                        res.end(JSON.stringify(code.mysqlError))
                        return;
                    }else{
                        res.end(common.format(200,'success',''))
                    }
                }
            )
        }else{
            console.log('参数错误');
            res.end(JSON.stringify(code.paramError));
            return;
        }
    }else{
        // console.log('你没有登陆');
        res.end(JSON.stringify(code.loginError));
        return;
    }
};

module.exports = notice;
