-- This will run when the MySQL container first starts
CREATE DATABASE IF NOT EXISTS farmazon;

USE farmazon;

CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insert values into the user table
INSERT INTO user (name, gender) VALUES
('thomas', 'male'),
('thomas', 'female'),
('thomas', 'gay');