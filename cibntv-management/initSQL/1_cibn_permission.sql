/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.12
Source Server Version : 50629
Source Host           : 192.168.1.12:3006
Source Database       : haoxuesheng_cibn

Target Server Type    : MYSQL
Target Server Version : 50629
File Encoding         : 65001

Date: 2016-07-08 17:51:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cibn_permission
-- ----------------------------
DROP TABLE IF EXISTS `cibn_permission`;
CREATE TABLE `cibn_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `functionId` bigint(20) DEFAULT NULL,
  `groups` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `per_url` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_7s4u3rb7l47lhm19dbo9di405` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cibn_permission
-- ----------------------------
INSERT INTO `cibn_permission` VALUES ('1', '2016-06-15 17:26:17', null, null, null, '用户管理', '5b2f2de6152c4619b0a14204bbaf6a7a', '/action/user', '0', 'userControl', '2016-06-15 17:26:17');
INSERT INTO `cibn_permission` VALUES ('2', '2016-06-15 17:26:17', null, null, null, '订单管理', '98ec614925ab42f989ae3e15103d3aa5', '/action/vip_order', '0', 'orderControl', '2016-06-15 17:26:17');
INSERT INTO `cibn_permission` VALUES ('3', '2016-06-15 17:26:17', null, null, null, 'VIP管理', '8d467952f48143bcbae0172f452ffffa', '/action/vip_pack', '0', 'vipControl', '2016-06-15 17:26:17');
INSERT INTO `cibn_permission` VALUES ('4', '2016-06-15 17:26:17', null, null, null, '试卷管理', 'e3a4a146d4ed4f2f8e82bbfd3a29be0f', '/action/paper', '0', 'paperControl', '2016-06-15 17:26:17');
INSERT INTO `cibn_permission` VALUES ('5', '2016-06-15 17:26:17', null, null, null, '视频管理', 'cc7691cc0adf43bf9f4fa158b92cc246', '/action/video', '0', 'videoControl', '2016-06-15 17:26:17');
INSERT INTO `cibn_permission` VALUES ('6', '2016-06-15 17:26:17', null, null, null, '权限管理', '98849652b4ba44b095e9f86342086a6a', '/action/role', '0', 'roleControl', '2016-06-15 17:26:17');
