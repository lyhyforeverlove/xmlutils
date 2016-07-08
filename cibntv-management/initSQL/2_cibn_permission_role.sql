/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.12
Source Server Version : 50629
Source Host           : 192.168.1.12:3006
Source Database       : haoxuesheng_cibn

Target Server Type    : MYSQL
Target Server Version : 50629
File Encoding         : 65001

Date: 2016-07-08 17:52:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cibn_permission_role
-- ----------------------------
DROP TABLE IF EXISTS `cibn_permission_role`;
CREATE TABLE `cibn_permission_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `permission_uuid` varchar(255) NOT NULL,
  `role_uuid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cibn_permission_role
-- ----------------------------
INSERT INTO `cibn_permission_role` VALUES ('15', '5b2f2de6152c4619b0a14204bbaf6a7a', '4e36536379844090b6c6ed825455de29');
INSERT INTO `cibn_permission_role` VALUES ('16', '98ec614925ab42f989ae3e15103d3aa5', '4e36536379844090b6c6ed825455de29');
INSERT INTO `cibn_permission_role` VALUES ('17', '8d467952f48143bcbae0172f452ffffa', '4e36536379844090b6c6ed825455de29');
INSERT INTO `cibn_permission_role` VALUES ('18', 'e3a4a146d4ed4f2f8e82bbfd3a29be0f', '4e36536379844090b6c6ed825455de29');
INSERT INTO `cibn_permission_role` VALUES ('19', 'cc7691cc0adf43bf9f4fa158b92cc246', '4e36536379844090b6c6ed825455de29');
INSERT INTO `cibn_permission_role` VALUES ('20', '98849652b4ba44b095e9f86342086a6a', '4e36536379844090b6c6ed825455de29');
