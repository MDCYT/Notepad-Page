--User Table
CREATE DATABASE database_bloc;

USE database_bloc;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(2560) NOT NULL,
    names VARCHAR(32) NOT NULL,
    first_surname VARCHAR(20) NOT NULL,
    second_surname VARCHAR(20) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT + 2;

DESCRIBE users;

--Bloc Table
CREATE TABLE bloc (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    text TEXT NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE bloc
    add PRIMARY KEY (id);

ALTER TABLE bloc
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT + 2;

DESCRIBE bloc;
