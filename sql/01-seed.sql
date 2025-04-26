-- This will run when the MySQL container first starts
CREATE DATABASE IF NOT EXISTS farmazon;

USE farmazon;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255), 
  email VARCHAR(255) UNIQUE NOT NULL, 
  type ENUM('customer', 'farmer') NOT NULL, 
  password VARCHAR(255) NOT NULL 
);
-- this one is the type of user can be customer

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  phone VARCHAR(20),
  customer_id_info INT,
  FOREIGN KEY (customer_id_info) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS farmers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  farm_location VARCHAR(255),
  suburb VARCHAR(255),
  contact_info VARCHAR(255),
  farmer_id_info INT,
  FOREIGN KEY (farmer_id_info) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(255),
  name VARCHAR(255),
  image_link VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  unit VARCHAR(50),
  stock INT,
  farmer_id INT,
  location VARCHAR(255),
  delivery BOOLEAN,
  pickup BOOLEAN,
  expiry_date DATE,
  FOREIGN KEY (farmer_id) REFERENCES farmers(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  delivery_date DATE,
  status ENUM('pending', 'dispatched', 'delivered', 'canceled'),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);


CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);


CREATE TABLE IF NOT EXISTS hub_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  arrival_time DATETIME,
  quantity INT,
  shelf_life_days INT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);


CREATE TABLE IF NOT EXISTS logistics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_item_id INT,
  stage ENUM('farm_pickup', 'in_transit_to_hub', 'at_hub'),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delay_notes TEXT,
  FOREIGN KEY (order_item_id) REFERENCES order_items(id)
);
