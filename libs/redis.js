/**
 * mysql模块，只负责连接数据库，
 */
var config = require('../config');
var Redis = require('ioredis');
console.log({
  port:config.redis.port,
  host:config.redis.host
});
var redis = new Redis({
  port:config.redis.port,
  host:config.redis.host
});

module.exports = redis;

redis.on('error',function(e,r){
  console.log('reids error');
  console.log(r);
});

redis.on('connect',function(e,r){
  console.log('redis connect');
})
