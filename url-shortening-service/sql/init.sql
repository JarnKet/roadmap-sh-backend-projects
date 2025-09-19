CREATE DATABASE url_shortener;

USE url_shortener;

CREATE TABLE urls (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      original_url TEXT NOT NULL,
                      short_code VARCHAR(10) NOT NULL UNIQUE,
                      access_count INT DEFAULT 0,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);