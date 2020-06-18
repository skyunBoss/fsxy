/*
 Navicat Premium Data Transfer

 Source Server         : 39.98.135.88_3306
 Source Server Type    : MySQL
 Source Server Version : 50644
 Source Host           : 39.98.135.88:3306
 Source Schema         : fsxy

 Target Server Type    : MySQL
 Target Server Version : 50644
 File Encoding         : 65001

 Date: 18/06/2020 11:06:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fs_admin
-- ----------------------------
DROP TABLE IF EXISTS `fs_admin`;
CREATE TABLE `fs_admin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '管理员用户名',
  `password` varchar(255) NOT NULL COMMENT '管理员密码',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for fs_article
-- ----------------------------
DROP TABLE IF EXISTS `fs_article`;
CREATE TABLE `fs_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL COMMENT '分类id',
  `title` varchar(20) NOT NULL COMMENT '文章标题',
  `content` text NOT NULL COMMENT '文章内容',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for fs_category
-- ----------------------------
DROP TABLE IF EXISTS `fs_category`;
CREATE TABLE `fs_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL COMMENT '分类标题',
  `desc` varchar(30) NOT NULL COMMENT '分类描述',
  `cover` varchar(255) NOT NULL COMMENT '分类封面',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for fs_comment
-- ----------------------------
DROP TABLE IF EXISTS `fs_comment`;
CREATE TABLE `fs_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `content` varchar(50) NOT NULL COMMENT '内容',
  `image` varchar(255) NOT NULL COMMENT '图片',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for fs_contact
-- ----------------------------
DROP TABLE IF EXISTS `fs_contact`;
CREATE TABLE `fs_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(10) NOT NULL,
  `value` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for fs_examination
-- ----------------------------
DROP TABLE IF EXISTS `fs_examination`;
CREATE TABLE `fs_examination` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `unit` varchar(30) DEFAULT NULL COMMENT '预约单位',
  `excel` varchar(255) NOT NULL COMMENT '预约表格',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '预约状态',
  `date` varchar(20) DEFAULT NULL COMMENT '预约时间',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for fs_member
-- ----------------------------
DROP TABLE IF EXISTS `fs_member`;
CREATE TABLE `fs_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `head` varchar(255) NOT NULL COMMENT '头像',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `sex` int(1) NOT NULL COMMENT '性别',
  `job` varchar(255) NOT NULL COMMENT '工种',
  `seniority` varchar(255) NOT NULL COMMENT '工龄',
  `department` varchar(255) NOT NULL COMMENT '科室',
  `company` varchar(255) NOT NULL COMMENT '公司',
  `birthday` timestamp NOT NULL COMMENT '出生年月',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
