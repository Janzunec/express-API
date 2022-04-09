CREATE DATABASE blog;

USE blog;

CREATE TABLE IF NOT EXISTS users (
    user_ID INT AUTO_INCREMENT,
    firstName VARCHAR(64) NOT NULL,
    secondName VARCHAR(64) NOT NULL,
    username VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password varchar(256) NOT NULL,
    PRIMARY KEY(user_ID)
);

CREATE TABLE IF NOT EXISTS posts (
    post_ID INT AUTO_INCREMENT,
    title VARCHAR(128) NOT NULL,
    body LONGTEXT NOT NULL,
    image LONGTEXT NOT NULL,
    user INT NOT NULL,
    uploaded DATETIME NOT NULL,
    PRIMARY KEY(post_ID),
    FOREIGN KEY(user) REFERENCES users(user_ID)
);

CREATE TABLE IF NOT EXISTS comments(
    comment_ID INT AUTO_INCREMENT,
    title TEXT NOT NULL,
    body MEDIUMTEXT NOT NULL,
    post INT NOT NULL,
    user INT NOT NULL,
    uploaded DATETIME NOT NULL,
    PRIMARY KEY(comment_ID),
    FOREIGN KEY(post) REFERENCES posts(post_ID),
    FOREIGN KEY(user) REFERENCES users(user_ID)

);

INSERT INTO users(firstName, secondName, username, email, password) VALUES('Jan', 'Zunec', 'Janzunec', 'zune.jan@gmail.com', 'zunko2004')