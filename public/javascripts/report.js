(function(bom,dom,$){


    /**
     * 检测提交文章的参数
     * @param o
     * @param cb
     */
bom.check = function (o,cb){
    //console.log(o);
    if(!o.content){
        cb({
            code:3001,
            message:"内容不能为空"
        });
        return;
    }

    if(!o.postId){
        cb({
            code:3002,
            message:"postId不能为空"
        });
        return;
    }

    cb(null,{
            content: o.content,
            postId:o.postId
    })


};

    /**
     *
     * @param o
     * @param cb
     */
bom.post = function(o,cb){

    bom.check(o,function(e,r){
        if(e){
            cb(e);
            return;
        }

        //console.log(r);
        $.ajax({
            type: 'POST',
            url: '/api/report',
            data: JSON.stringify(r),
            success: function(data) { //alert('data: ' + data);

            cb(data);
            },
            contentType: "application/json",
            dataType: 'json'
        });
    })

};

    $(dom).ready(function(){

        $("#submitButton").on(
            'click',function(){
                var $submitButton=$(this);
                $submitButton.button('loading');
                var o={};
                o.content = $("#content").val();
                o.postId = bom.getQueryString('id');
//                   console.log(o);
                bom.post(o,function(r){
                    if(r.code==200) {
                        $("#content").val("");
                        $submitButton.button('reset');
                        //console.log('success');
                        //跳转到前一页
                        location.href = '/';
                    }else{
                        $submitButton.button('reset');
                        alert(r.message);
                    }


                })
            }
        );
    });

})(self,self.document,self.jQuery);