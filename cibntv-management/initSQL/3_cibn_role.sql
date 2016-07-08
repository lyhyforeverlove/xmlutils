/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.12
Source Server Version : 50629
Source Host           : 192.168.1.12:3006
Source Database       : haoxuesheng_cibn

Target Server Type    : MYSQL
Target Server Version : 50629
File Encoding         : 65001

Date: 2016-07-08 17:51:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cibn_role
-- ----------------------------
DROP TABLE IF EXISTS `cibn_role`;
CREATE TABLE `cibn_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_k9swbfqgy9sv6n4510rrrts3i` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cibn_role
-- ----------------------------
INSERT INTO `cibn_role` VALUES ('6', '2016-06-16 10:04:43', null, '系统管理员', '4e36536379844090b6c6ed825455de29', '0', '3', '2016-06-16 10:04:43');
