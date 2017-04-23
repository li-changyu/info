
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
        url:"https://hook.bearychat.com/=bwAjY/incoming/716ab9ef7f4b38478a6a34f161e317a2",
        body:_option
    };
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
