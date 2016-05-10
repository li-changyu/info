# ************************************************************
# Sequel Pro SQL dump
# Version 4529
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 115.159.97.90 (MySQL 5.5.49-0ubuntu0.14.04.1)
# Database: secret
# Generation Time: 2016-05-10 17:42:11 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table secret_account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_account`;

CREATE TABLE `secret_account` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0' COMMENT 'userId',
  `studentId` bigint(16) DEFAULT '0' COMMENT '学号',
  `password` char(32) DEFAULT '' COMMENT '密码',
  `date` int(10) DEFAULT '0' COMMENT '绑定时间',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `studentId` (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_answer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_answer`;

CREATE TABLE `secret_answer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` char(255) DEFAULT '' COMMENT '文本',
  `time` int(11) DEFAULT '0' COMMENT '添加的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_blacklist
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_blacklist`;

CREATE TABLE `secret_blacklist` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0' COMMENT '用户id',
  `time` int(10) DEFAULT '0' COMMENT '封禁时间',
  `reason` char(255) DEFAULT '0' COMMENT '封禁理由',
  `reportId` int(11) DEFAULT '0' COMMENT '相关帖子',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_comment`;

CREATE TABLE `secret_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `postId` int(11) NOT NULL DEFAULT '0' COMMENT '文章id',
  `parentId` int(11) DEFAULT '0' COMMENT '父id，如果直接评论，则为空，若回复某个评论则为某评论的id',
  `secret` int(1) DEFAULT '0' COMMENT '是否匿名,匿名则为0,实名则为1',
  `content` varchar(4096) DEFAULT '' COMMENT '内容',
  `date` int(10) DEFAULT '0' COMMENT '评论创建时间',
  `userId` int(11) DEFAULT '0',
  `avatar` char(255) DEFAULT '',
  `nickname` char(32) DEFAULT '',
  `gender` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `parentId` (`parentId`),
  KEY `secret` (`secret`),
  KEY `date` (`date`),
  KEY `userId` (`userId`),
  KEY `gender` (`gender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;



# Dump of table secret_comment_like
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_comment_like`;

CREATE TABLE `secret_comment_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT '0',
  `commentId` int(11) NOT NULL DEFAULT '0',
  `date` int(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `commentId` (`commentId`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;



# Dump of table secret_library
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_library`;

CREATE TABLE `secret_library` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0' COMMENT 'userId',
  `studentId` char(16) DEFAULT '0' COMMENT '图书馆帐号',
  `password` char(32) DEFAULT '' COMMENT '密码',
  `date` int(10) DEFAULT '0' COMMENT '绑定时间',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `studentId` (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_notice
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_notice`;

CREATE TABLE `secret_notice` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0',
  `parentCommentId` int(11) DEFAULT '0' COMMENT 'replyComment,likeComment 有,其他为0',
  `date` int(10) DEFAULT '0',
  `status` int(1) DEFAULT '0' COMMENT '1为未读,0为已读',
  `pattern` int(1) DEFAULT '0' COMMENT '1为赞帖子,2为评论帖子,3为赞评论,4为评论评论',
  `nickname` char(32) DEFAULT '',
  `content` char(128) DEFAULT '',
  `originContent` char(128) DEFAULT '',
  `postId` int(11) DEFAULT '0',
  `authorId` int(11) DEFAULT '0' COMMENT '帖子id',
  `commentId` int(11) DEFAULT '0' COMMENT 'replyPost,replyComment有,别的为0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_open
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_open`;

CREATE TABLE `secret_open` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0' COMMENT '用户id',
  `openId` char(64) DEFAULT '' COMMENT '第三方唯一id',
  `unionId` char(128) DEFAULT '' COMMENT '微信公共id',
  `source` char(16) DEFAULT '' COMMENT 'wechat,weibo,qq',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `openId` (`openId`),
  KEY `unionId` (`unionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_post
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_post`;

CREATE TABLE `secret_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `secret` int(1) NOT NULL DEFAULT '0' COMMENT '是否匿名,匿名则为0,实名则为1',
  `content` varchar(4096) DEFAULT '' COMMENT '内容',
  `userId` int(11) DEFAULT '0',
  `title` char(141) DEFAULT '',
  `more` int(1) DEFAULT '0',
  `gender` int(1) DEFAULT '0' COMMENT '性别:0:woman',
  `nickname` char(32) DEFAULT '' COMMENT '昵称',
  `avatar` char(255) DEFAULT '',
  `date` int(10) DEFAULT '0' COMMENT '文章创建时间',
  `top` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `secret` (`secret`),
  KEY `userId` (`userId`),
  KEY `gender` (`gender`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;



# Dump of table secret_post_like
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_post_like`;

CREATE TABLE `secret_post_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT '0',
  `postId` int(11) NOT NULL DEFAULT '0',
  `date` int(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;



# Dump of table secret_report
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_report`;

CREATE TABLE `secret_report` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `postId` int(11) DEFAULT '0' COMMENT '文章id',
  `time` int(11) DEFAULT '0' COMMENT '举报时间',
  `status` int(1) DEFAULT '0' COMMENT '0是未审核，1是审核通过,2是审核不通过',
  `reason` varchar(300) DEFAULT '0' COMMENT '删除理由',
  `userId` int(11) DEFAULT '0' COMMENT '举报人星系',
  `content` varchar(4096) DEFAULT '' COMMENT '发帖内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_share
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_share`;

CREATE TABLE `secret_share` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0' COMMENT '分享的用户id',
  `type` char(16) DEFAULT '' COMMENT '分享的类型',
  `avatar` char(255) DEFAULT '' COMMENT '分享主人的头像',
  `nickname` char(64) DEFAULT '' COMMENT '昵称',
  `gender` int(1) DEFAULT '0' COMMENT '性别',
  `createAt` int(10) DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_tag`;

CREATE TABLE `secret_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` int(10) DEFAULT '0',
  `name` char(32) DEFAULT '',
  `userId` int(11) DEFAULT '0' COMMENT '创建标签的用户id',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `date` (`date`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_tag_relation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_tag_relation`;

CREATE TABLE `secret_tag_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagId` int(11) DEFAULT '0',
  `postId` int(11) DEFAULT '0',
  `date` int(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `tagId` (`tagId`),
  KEY `postId` (`postId`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_token
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_token`;

CREATE TABLE `secret_token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `accessToken` char(128) DEFAULT '' COMMENT 'access_token',
  `refreshToken` char(128) DEFAULT '' COMMENT 'refreshtoken',
  `accessExpire` int(10) DEFAULT '0' COMMENT '到期时间',
  `refreshExpire` int(10) DEFAULT '0' COMMENT 'refresh到期时间',
  `from` char(8) DEFAULT '' COMMENT '哪个第三方:wechat,weibo,qq',
  PRIMARY KEY (`id`),
  KEY `accessToken` (`accessToken`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_user`;

CREATE TABLE `secret_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` char(16) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `tel` (`tel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_user_extend
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_user_extend`;

CREATE TABLE `secret_user_extend` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT '0' COMMENT 'userId',
  `gender` int(1) DEFAULT '0' COMMENT '性别,男1，女0',
  `nickname` char(32) DEFAULT '' COMMENT '昵称',
  `avatar` char(255) DEFAULT '' COMMENT '头像',
  `date` int(10) DEFAULT '0' COMMENT '时间',
  `level` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `gender` (`gender`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table secret_weibo_query
# ------------------------------------------------------------

DROP TABLE IF EXISTS `secret_weibo_query`;

CREATE TABLE `secret_weibo_query` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createAt` int(10) DEFAULT '0' COMMENT '写入的时间',
  `status` int(1) DEFAULT '0' COMMENT '是否已发布',
  `postAt` int(10) DEFAULT '0' COMMENT '发布微博的时间',
  `postId` int(10) DEFAULT '0' COMMENT '帖子id',
  `weiboId` bigint(32) DEFAULT '0' COMMENT '发布的微博Id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table wechat_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wechat_log`;

CREATE TABLE `wechat_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openid` char(64) DEFAULT '' COMMENT '发送消息的Openid',
  `content` varchar(4096) DEFAULT '' COMMENT '消息内容',
  `createAt` int(10) DEFAULT '0' COMMENT '发送时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table wechat_message
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wechat_message`;

CREATE TABLE `wechat_message` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(1024) DEFAULT '' COMMENT '留言内容',
  `createAt` int(10) DEFAULT '0' COMMENT '创建时间',
  `openId` char(64) DEFAULT '' COMMENT 'openid',
  `nickname` char(64) DEFAULT '' COMMENT '昵称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table wechat_news
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wechat_news`;

CREATE TABLE `wechat_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` char(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `name` char(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '规则名',
  `title` char(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` char(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `pic` char(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `url` char(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `keyword` (`keyword`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table wechat_notice_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wechat_notice_log`;

CREATE TABLE `wechat_notice_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openId` char(255) DEFAULT '' COMMENT 'openId',
  `time` int(11) DEFAULT '0' COMMENT '时间',
  `data` varchar(1024) DEFAULT '' COMMENT '内容',
  `type` char(16) DEFAULT '' COMMENT '发送类型',
  `callback` char(255) DEFAULT '' COMMENT '发送状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table wechat_session
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wechat_session`;

CREATE TABLE `wechat_session` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openId` char(64) DEFAULT '' COMMENT 'openId',
  `createAt` int(10) DEFAULT '0' COMMENT '会话开始时间',
  `type` int(1) DEFAULT '0' COMMENT '会话类型,0为发布帖子,1为留言',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table wechat_text
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wechat_text`;

CREATE TABLE `wechat_text` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` char(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `name` char(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '规则名',
  `content` varchar(1024) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `keyword` (`keyword`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
