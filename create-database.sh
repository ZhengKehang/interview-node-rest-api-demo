-- 创建数据库
CREATE DATABASE IF NOT EXISTS testdatabase;

-- 使用新创建的数据库
USE testdatabase;

-- 创建表
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
