# 连接到 MySQL 并执行 SQL 语句
mysql -u root -p <<EOF
CREATE DATABASE IF NOT EXISTS testdatabase;

USE testdatabase;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
EOF
