/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.12
Source Server Version : 50629
Source Host           : 192.168.1.12:3006
Source Database       : haoxuesheng_cibn

Target Server Type    : MYSQL
Target Server Version : 50629
File Encoding         : 65001

Date: 2016-07-08 17:50:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cibn_manager
-- ----------------------------
DROP TABLE IF EXISTS `cibn_manager`;
CREATE TABLE `cibn_manager` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `access_key` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `create_manager_id` bigint(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `extend_` varchar(255) DEFAULT NULL,
  `is_del` tinyint(1) DEFAULT NULL,
  `is_first` tinyint(1) DEFAULT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `r_name` varchar(255) DEFAULT NULL,
  `r_uuid` varchar(255) DEFAULT NULL,
  `real_name` varchar(255) DEFAULT NULL,
  `secret_key` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_k1i3j0ps47xiq80fwys88s55r` (`access_key`),
  UNIQUE KEY `UK_k0pvheowpd5if8gnv1ldqoycr` (`phone`),
  UNIQUE KEY `UK_9j90xbjtw39bh3xyaxgt69odo` (`secret_key`),
  UNIQUE KEY `UK_o3bqvdw9u4jrvivw39hsqxvqg` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cibn_manager
-- ----------------------------
INSERT INTO `cibn_manager` VALUES ('1', null, '2016-06-16 10:42:31', null, null, null, '0', '0', null, 'admin', 'a66abb5684c45962d887564f08346e8d', '15110289870', '系统管理员', '4e36536379844090b6c6ed825455de29', null, null, '2', '3', null, '4bd9f930c77748a4a07dc1699c61f9d9');
