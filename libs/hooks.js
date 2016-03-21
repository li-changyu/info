
var request=require('request');

var hooks = {

};


hooks.bearychatIncoming = function(option,cb){
    var _option = {
        "text": option.type,
        "markdown": true,
        "channel": "机器人们",
        "attachments": [
            {
                "title": option.title?option.title:"",
                "text":option.text?option.text:"" ,
                "color": "#ffa500"
            }
        ]
    };


    var opts = {
        json:true,
        method:"POST",
        url:"https://hook.bearychat.com/=bw8fe/incoming/0249756f9b5d2df8429845794486acf0",
        body:_option
    };
    console.log(opts);
    request(opts,function(e,r,b){

        if(e){
            cb(e);
            return;
        }else if(r.statusCode == 200){

            cb(null);

        }else{

            console.log(b);
            cb({
                message:"返回值不是200,是"+r.statusCode
            })
        }

    });


};





module.exports = hooks;