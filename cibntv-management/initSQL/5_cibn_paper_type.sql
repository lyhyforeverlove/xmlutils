/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.12
Source Server Version : 50629
Source Host           : 192.168.1.12:3006
Source Database       : haoxuesheng_cibn

Target Server Type    : MYSQL
Target Server Version : 50629
File Encoding         : 65001

Date: 2016-07-08 17:53:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cibn_paper_type
-- ----------------------------
DROP TABLE IF EXISTS `cibn_paper_type`;
CREATE TABLE `cibn_paper_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_aft` datetime DEFAULT NULL,
  `date_bef` datetime DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_hoe4idwra5h5c936s628nusjm` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cibn_paper_type
-- ----------------------------
INSERT INTO `cibn_paper_type` VALUES ('1', '2016-06-04 23:59:59', '2016-06-01 00:00:00', '1', '高考测试', '100', '5', 'e6e6be87ed124fac879f345d7375ecb0');
INSERT INTO `cibn_paper_type` VALUES ('2', '2016-06-30 23:59:59', '2016-06-30 00:00:00', '0.9', '单元测试', '15.13', '1', '51c4c716c30e4b0ba902d1604d2d1b54');
INSERT INTO `cibn_paper_type` VALUES ('3', '2016-06-24 23:59:59', '2016-06-18 00:00:00', '0.8', '期末测试', '13.36', '3', '4e954de8fd9341b38231b97202a4606f');
INSERT INTO `cibn_paper_type` VALUES ('4', '2016-06-24 23:59:59', '2016-06-24 00:00:00', '0.33', '期中测试', '13.23', '2', '88c780d377654ef0bc2e563df77c816b');
INSERT INTO `cibn_paper_type` VALUES ('5', '2016-07-23 23:59:59', '2016-07-23 00:00:00', '0.66', '中考测试', '16.8', '4', 'e77c7a268dc44be792fbafc6d79150f7');
