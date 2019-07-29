# create databases
CREATE DATABASE IF NOT EXISTS hierax;

# create users and grant rights
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'noofs';
CREATE USER IF NOT EXISTS 'hierax'@'localhost' IDENTIFIED BY 'hierax';
GRANT ALL ON *.* TO 'root'@'%';
GRANT ALL ON hierax.* TO 'hierax'@'%';

# init fkyced structure

USE hierax;

DROP TABLE IF EXISTS `Entities`;

CREATE TABLE `Entities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;