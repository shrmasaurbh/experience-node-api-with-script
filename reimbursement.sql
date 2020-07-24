-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `reimbursement`;
CREATE DATABASE `reimbursement` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `reimbursement`;

DROP TABLE IF EXISTS `conveyance`;
CREATE TABLE `conveyance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice` int(11) DEFAULT NULL,
  `pay` tinyint(1) NOT NULL,
  `purpose` tinyint(1) NOT NULL,
  `mode` tinyint(1) NOT NULL,
  `kms` varchar(5) DEFAULT NULL,
  `amount` int(10) NOT NULL,
  `attachment` varchar(50) NOT NULL,
  `from` time NOT NULL,
  `to` time NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  `employee_id` varchar(10) NOT NULL,
  `name` varchar(15) DEFAULT NULL,
  `working_type` varchar(15) NOT NULL,
  `start` varchar(6) NOT NULL,
  `end` varchar(6) NOT NULL,
  `store_id` varchar(20) NOT NULL,
  `store_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `hotel`;
CREATE TABLE `hotel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `pay` tinyint(1) NOT NULL,
  `mode` tinyint(1) NOT NULL,
  `amount` int(10) NOT NULL,
  `attachment` varchar(50) NOT NULL,
  `from_date` time NOT NULL,
  `to_date` time NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;


-- 2020-07-24 09:08:22
