CREATE DATABASE userlogin_db;
USE userlogin_db;

CREATE TABLE login (
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);