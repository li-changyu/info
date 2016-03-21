var hooks = require('../libs/hooks.js');

var request = require('request');
var rr ={nickname : "小明plus"};

var msg = {
    Content:'你好主页菌在吗'
}




hooks.bearychatIncoming({type:'微信公众号scuinfo有新留言'},function(e,r){
    //console.log(e,r);
});

var op = {

    url:"http://scuinfo.com",

    headers:{
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36"
    }
}

request(op,function(e,r,b){
    console.log(r.statusCode);

    //console.log(b);
})
