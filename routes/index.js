var express = require('express');
var multer = require('multer');
var router = express.Router();
var api = require('./api.js');
var common = require('../libs/common.js');
var pages = require('./pages.js');
var post = require('../controller/post.js');
var comment = require('../controller/comment.js');
var like = require('../controller/like.js');
var tag = require('../controller/tag.js');
var account = require('../controller/account.js');
var profile = require('../controller/profile.js');
//var notice = require('../controller/notice.js');
var check = require('../libs/check.js');
var bind = require('../controller/bind.js');
var notice = require('../controller/notice.js')
var wechatApi= require('../libs/wechatApi.js');
//todo

router.all('/api/*',function(req,res,next){
    //console.log('success in all')

    api.before(req,res,next);
});

router.get('/api/post',function(req,res) {//文章详情

    post.postsDetail(req, res);
//    console.log(req.params.id);
//    console.log(req.params.id);
});
router.get('/api/posts',function(req,res){//文章列表
   // console.log('success in index');
    post.postsView(req,res);
});

router.post('/api/white',function(req,res){
  post.postsDelReport(req,res);
});
router.post('/api/block',function(req,res){
  post.block(req,res);
})
router.get('/api/hot',function(req,res){//文章列表
    // console.log('success in index');
    post.hotPosts(req,res);
});
router.post('/api/like/post',check.isLoginApi,function(req,res){//文章点赞

   like.post(req,res);
});

router.post('/api/like/comment',check.isLoginApi,function(req,res){//评论点赞

    like.comment(req,res);
});

router.delete('/api/like/post',check.isLoginApi,function(req,res){//文章取消点赞
    //console.log('success');
    like.postsDel(req,res);
});
router.delete('/api/like/comment',check.isLoginApi,function(req,res){//点赞评论删除
    like.commentDel(req,res);
});

router.post('/api/post',check.isLoginApi,function(req,res){//添加文章

    post.create(req,res);
});

router.post('/api/report',check.isLoginApi,function(req,res){//添加文章

    post.report(req,res);
});

router.get('/api/reports',check.isLoginApi,function(req,res){
    post.reports(req,res);
});
router.post('/api/postMove',function(req,res){//添加文章

    post.createMove(req,res);
});


router.post('/api/postWechat',function(req,res){//添加文章
    post.createWechat(req,res);
});

router.post('/api/comment',check.isLoginApi,function(req,res) {//添加评论

    comment.commentPost(req, res);
});

router.delete('/api/comment',check.isLoginApi,function(req,res){//删除评论
    comment.commentDel(req,res);
});

router.get('/api/comments',function(req,res){//评论列表
    comment.commentView(req,res);
});

router.delete('/api/post',check.isLoginApi,function(req,res){//文章删除
    post.postsDel(req,res);
});


router.put('/api/status/post',check.isLoginApi,function(req,res){//文章匿名转实名
    post.change(req,res);
});

router.put('/api/status/comment',check.isLoginApi, function (req, res) {//评论匿名转实名
    comment.change(req,res);
});

router.get('/api/tags',function(req,res){//标签列表
   tag.tag(req,res);
});

router.get('/api/tag', function (req,res) {//标签查找帖子列表
    //console.log(req.query);
    tag.list(req,res);
});
router.get('/api/posts/like', function (req, res) {//我赞过的帖子列表
    tag.like(req,res);
});
router.get('/api/profile',function(req,res){//用户数据
    //req.session.userId=14004;
    profile.like(req,res);
});


router.get('/api/tag/count',function(req,res){//获取某个标签文章数
    tag.count(req,res);
});

router.get('/api/notice/count',function(req,res){//获取当前用户的通知数

    notice.count(req,res);
});

router.get('/api/notice/status', function (req, res) {

    notice.change(req,res);
});

router.get('/api/notices',check.isLoginApi, function (req, res) {

    notice.list(req,res);
});




router.post('/api/share',check.isLoginApi,function(req,res){
   profile.share(req,res);
});

router.get('/api/share/book',function(req,res){
    profile.shareBook(req,res);
});

router.get('/api/share/major',function(req,res){
    profile.shareMajor(req,res);
});


router.get('/api/share/exam',function(req,res){
    profile.shareExam(req,res);
});

router.get('/api/share/examAgain',function(req,res){
    profile.shareExamAgain(req,res);
});

router.get('/api/score',check.isLoginApi,function(req,res){
    profile.score(req,res);
});

router.get('/api/major',check.isLoginApi,function(req,res){
    profile.major(req,res);
});


router.get('/api/examAgain',check.isLoginApi,function(req,res){
    profile.examAgain(req,res);
});
router.get('/api/exam',check.isLoginApi,function(req,res){
    profile.exam(req,res);
});
router.get('/api/book',check.isLoginApi,function(req,res){


    profile.book(req,res);
});

router.post('/api/renew',check.isLoginApi,function(req,res){
    profile.renew(req,res);
});

router.post('/api/update',function(req,res){
   profile.update(req,res);
});



/**
 * 微信主动接口类
 */



/**
 * 账户绑定类
 */



router.post('/api/bind/accounts',function(req,res){
    bind.accounts(req,res);
});

router.get('/auth/wechat',check.isNotLogin,function(req,res){
    account.wechatLogin(req,res);
});


router.get('/auth/weibo',check.isNotLogin,function(req,res){
    account.weiboLogin(req,res);
});


router.get('/auth/weiboAdmin',check.isNotLogin,function(req,res){
    account.weiboAdmin(req,res);
});


router.get('/auth/wechatUserAgent',check.isNotLogin,function(req,res){
    account.wechatGetUserInfo(req,res);
});

router.get('/auth/lucky',account.luckyAuth);
router.get('/auth/luckyWeb',account.luckyWebAuth);


//
router.get('/',check.autoWechat,function(req,res){
    pages.index(req,res);
//
});

router.get('/debug',function(req,res){


    req.session.level=0;
    req.session.userId=888888;
    req.session.avatar="http://img5q.duitang.com/uploads/blog/201504/03/20150403214054_nekQt.jpeg";
    req.session.nickname="我就喜欢语文老师体育能跑100米";
    req.session.gender=2;
    req.session.userStatus='login';
    //console.log(req.session);
    pages.index(req,res);
//
});
router.get('/debug/:userId',check.autoWechat,function(req,res){

    req.session.level=1;
    req.session.userId=req.params.userId;
    req.session.avatar="http://img5q.duitang.com/uploads/blog/201504/03/20150403214054_nekQt.jpeg";
    req.session.nickname="我就喜欢语文老师体育能跑100米";
    req.session.gender=2;
    req.session.userStatus='login';
    console.log(req.session);
    pages.index(req,res);
//
});




router.get('/tag/:name',check.autoWechat,function(req,res){
    pages.tag(req,res);
});


router.get('/u/:userId/like',check.autoWechat,function(req,res){

    pages.like(req,res);
});

router.get('/u/:userId/posts',check.autoWechat,function(req,res){

    pages.profilePosts(req,res);
});
router.get('/p/:id',check.autoWechat,function(req,res){

    pages.detail(req,res);
});


router.get('/u',check.autoWechat,check.isLogin,function(req,res){


    pages.profile(req,res);
});


router.get('/score',check.autoWechat,check.isLogin,function(req,res){

    pages.score(req,res);
});


router.get('/classroom',check.autoWechat,function(req,res){
    pages.classroom(req,res);
});


router.get('/course',check.autoWechat,function(req,res){
    pages.course(req,res);
});



router.get('/dean',check.autoWechat,function(req,res){
    pages.dean(req,res);
});

router.get('/major',check.autoWechat,check.isLogin,function(req,res){

    pages.major(req,res);
});


router.get('/exam',check.autoWechat,check.isLogin,function(req,res){

    pages.exam(req,res);
});

router.get('/examAgain',check.autoWechat,check.isLogin,function(req,res){


    pages.examAgain(req,res);
});


router.get('/book',check.autoWechat,check.isLogin,function(req,res){

    pages.book(req,res);
});

router.get('/share/book',check.autoWechat,function(req,res){
    pages.shareBook(req,res);
});

router.get('/share/major',check.autoWechat,function(req,res){
    pages.shareMajor(req,res);
});


router.get('/share/exam',check.autoWechat,function(req,res){
    pages.shareExam(req,res);
});


router.get('/share/examAgain',check.autoWechat,function(req,res){
    pages.shareExamAgain(req,res);
});

router.get('/u/:id',check.autoWechat,function(req,res){

    pages.profile(req,res);
});

//
router.get('/post',check.autoWechat,check.isLogin,function(req,res){


    pages.post(req,res);
});

router.get('/report',check.autoWechat,check.isLogin,function(req,res){
    pages.report(req,res);
});



router.get('/notice',check.autoWechat,check.isLogin,function(req,res){


    pages.notice(req,res);
});

router.get('/fm',check.autoWechat,function(req,res){
    pages.fm(req,res);
});

router.get('/signin',check.isNotLogin,function(req,res){
    pages.signin(req,res);
});
router.get('/signout',check.isLogin,function(req,res){
    account.logout(req,res);
});

var upload = multer()
router.post('/test',upload.single('pic'),function(req,res){
   account.test(req,res);
});
router.get('/test',function(req,res){


  var uas = req.headers['user-agent'];
  console.log(uas);

  var isWeixin = function(o){

      var ua = o.toLowerCase();
      console.log(ua);
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
          return true;
      } else {
          return false;
      }
  };

  var weixin = isWeixin(uas);

  res.end(uas+weixin);
});

router.get('/bind/dean',check.autoWechat,check.isLogin,function(req,res){
   pages.bindDean(req,res);
});

router.get('/bind/library',check.autoWechat,check.isLogin,function(req,res){
    pages.bindBook(req,res);
});

router.get('/t',function(req,res){
    res.render('t');
});

//这后边不能有路由了

module.exports = router;
