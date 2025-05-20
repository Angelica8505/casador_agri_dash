-- Create database
CREATE DATABASE IF NOT EXISTS agricultural_dashboard;
USE agricultural_dashboard;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    unit_price DECIMAL(10,2),
    quantity_in_stock INT DEFAULT 0
);

-- Create inventory_logs table
CREATE TABLE IF NOT EXISTS inventory_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    user_id INT,
    action_type ENUM('add', 'remove', 'adjust') NOT NULL,
    quantity INT NOT NULL,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create sales_transactions table
CREATE TABLE IF NOT EXISTS sales_transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity_sold INT NOT NULL,
    total_amount DECIMAL(10,2),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recorded_by INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (recorded_by) REFERENCES users(user_id)
);

-- Create delivery_records table
CREATE TABLE IF NOT EXISTS delivery_records (
    delivery_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT,
    delivery_personnel_id INT,
    delivery_date DATE,
    delivery_status ENUM('Pending', 'In Transit', 'Delivered') DEFAULT 'Pending',
    delivery_notes TEXT,
    FOREIGN KEY (transaction_id) REFERENCES sales_transactions(transaction_id),
    FOREIGN KEY (delivery_personnel_id) REFERENCES users(user_id)
);

-- Create forecast_reports table
CREATE TABLE IF NOT EXISTS forecast_reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    report_date DATE,
    created_by INT,
    report_data TEXT,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Create delivery_routes table
CREATE TABLE IF NOT EXISTS delivery_routes (
    route_id INT AUTO_INCREMENT PRIMARY KEY,
    delivery_id INT,
    route_path TEXT,
    geojson_data TEXT,
    FOREIGN KEY (delivery_id) REFERENCES delivery_records(delivery_id)
);

-- Insert sample roles
INSERT INTO roles (role_name) VALUES
('Admin'),
('Warehouse Man'),
('Secretary'),
('Delivery Personnel');

-- Insert sample users (passwords should be hashed in production)
INSERT INTO users (username, password, full_name, role_id) VALUES
('admin', '$2a$10$X7UrH5QxX5QxX5QxX5QxX.5QxX5QxX5QxX5QxX5QxX5QxX5QxX5Qx', 'Admin User', 1),
('warehouse', '$2a$10$X7UrH5QxX5QxX5QxX5QxX.5QxX5QxX5QxX5QxX5QxX5QxX5QxX5Qx', 'Warehouse Manager', 2),
('secretary', '$2a$10$X7UrH5QxX5QxX5QxX5QxX.5QxX5QxX5QxX5QxX5QxX5QxX5QxX5Qx', 'Office Secretary', 3),
('delivery', '$2a$10$X7UrH5QxX5QxX5QxX5QxX.5QxX5QxX5QxX5QxX5QxX5QxX5QxX5Qx', 'Delivery Person', 4);

-- Insert sample products
INSERT INTO products (product_name, category, unit_price, quantity_in_stock) VALUES
('Rice', 'Grains', 25.50, 1000),
('Corn', 'Grains', 20.75, 800),
('Wheat', 'Grains', 30.25, 600),
('Soybeans', 'Legumes', 28.00, 400),
('Potatoes', 'Vegetables', 15.75, 500),
('Tomatoes', 'Vegetables', 12.50, 300),
('Apples', 'Fruits', 18.25, 200),
('Oranges', 'Fruits', 16.50, 250); 