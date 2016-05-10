account.weiboLogin = function(req, res) {
  if (!req.query.code) {
    //用户不同意授权
    res.end(JSON.stringify(code.lackParamsCode));
    return;
  }
  var state = [];
  //自定义的字符串本系统中是登录后跳转回去的网址
  state = req.query.state.split(',');
  var appId, appSecret;
  //appId和appSecret
  appId = config.weibo.appkey;
  appSecret = config.weibo.appSecret;
  //用code换token
  request({
    url: 'https://api.weibo.com/oauth2/access_token',
    method: 'post',
    form: {
      client_id: appId,
      client_secret: appSecret,
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: config.site.url + '/auth/weibo'
    }
  }, function(e, r) {
    if (e) {
      res.end(JSON.stringify(code.requestError));
      return;
    } else {
      try {
        var codeResult = JSON.parse(r.body);
      } catch (e) {
        var codeResult = {
          error_code: 23333
        };
      }
      //错误处理
      if (codeResult.error_code) {
        res.end(JSON.stringify(code.weiboLoginCodeToAccessTokenError));
        return;
      }
      //查询系统数据库中是否有该用户
      conn.query({
          sql: 'select userId from secret_open where unionId = "' + codeResult.uid + '"'
        },
        function(e1, r1) {
          if (e1) {
            res.end(JSON.stringify(code.mysqlError));
            return;
          }
          //有该用户，执行登录逻辑
          if (r1.length > 0) {
            conn.query({
              sql: "select * from secret_user_extend where userId = " + r1[0].userId
            }, function(e2, r2) {
              if (e2) {
                res.end(JSON.stringify(code.mysqlError));
                console.log(e2);
                return;
              }
              if (r2.length > 0) {
                account.login(
                  req, res, {
                    avatar: r2[0].avatar,
                    unionId: codeResult.uid,
                    nickname: r2[0].nickname,
                    gender: r2[0].gender,
                    source: state[0],
                    userId: r1[0].userId,
                    redirect: state[1],
                    level: r2[0].level
                  }
                )
              } else {
                res.end(JSON.stringify(code.noUserInfo));
                return;
              }
            });
            //更新用户信息
            account.updateWeiboUserInfo(codeResult.access_token, codeResult.uid, r1[0].userId);
          } else {
            //没有该用户，执行注册逻辑
            //调用微博的用户信息接口
            request('https://api.weibo.com/2/users/show.json?access_token=' + codeResult.access_token + '&uid=' + codeResult.uid, function(ee, rr) {
              if (ee) {
                res.end(JSON.stringify(code.requestError));
                console.log(ee);
                return;
              }
              try {
                var userInfo = JSON.parse(rr.body);
              } catch (e) {
                var userInfo = {
                  error_code: 20000
                }
              }
              //处理错误信息
              if (userInfo.error_code) {
                console.log(userInfo);
                res.end(JSON.stringify(code.wechatLoginCodeToAccessTokenError));
                return;
              }
              var gender = {
                'm': 1,
                'f': 2,
                'n': 0
              };
              //执行注册逻辑
              account.register(req, res, {
                avatar: userInfo.avatar_large,
                openId: userInfo.id,
                unionId: userInfo.id,
                nickname: userInfo.screen_name,
                gender: gender[userInfo.gender],
                source: state[0],
                redirect: state[1]
              });
            });
          }
        }
      )
    }
  })
};
