-- 1. 데이터 베이스 생성
CREATE DATABASE mysqltest;

-- 2. products 테이블 생성
CREATE TABLE `products`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `modelnumber` VARCHAR(15) NOT NULL,
    `series` VARCHAR(30) NOT NULL
);

-- 3. 데이터 추가
INSERT INTO products (name, modelnumber, series) VALUES ("victolee", "1234", "1111");

-- 사용권한 오류 ('ER_NOT_SUPPORTED_AUTH_MODE')
-- https://blog.naver.com/username1103/222205372413
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '비밀번호입력';

-- 행 삭제
-- delete from products where (조건절) ;  (id = 4);

-- # sequelize db:migrate  실제 DB 반영
-- # npm start  서버 실행


