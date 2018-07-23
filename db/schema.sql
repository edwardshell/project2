DROP DATABASE IF EXISTS `dinder_db`;
CREATE DATABASE `dinder_db`;
USE `dinder_db`;

CREATE TABLE dinder(
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    group_name VARCHAR (50) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    restaurant_name VARCHAR (300),
    address VARCHAR(50),
    phone VARCHAR(50),
    rating VARCHAR(50),
    photo VARCHAR(100),
    website VARCHAR(255) 
);

