CREATE DATABASE IF NOT EXISTS giovanni_ricci;
USE giovanni_ricci;

CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('CUSTOMER','ADMIN') NOT NULL DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    image_url VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS food_items (
    food_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_food_category FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS addresses (
    address_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address_line VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address_id BIGINT,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING','CONFIRMED','PREPARING','READY','OUT_FOR_DELIVERY','DELIVERED','CANCELLED') NOT NULL DEFAULT 'PENDING',
    order_type ENUM('DELIVERY','PICKUP') NOT NULL DEFAULT 'DELIVERY',
    special_instructions VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_order_address FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    food_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_order_item_food FOREIGN KEY (food_id) REFERENCES food_items(food_id)
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('CASH','CARD','ONLINE') NOT NULL,
    payment_status ENUM('PENDING','PAID','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
    transaction_id VARCHAR(255),
    paid_at TIMESTAMP NULL,
    CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE IF NOT EXISTS reservations (
    reservation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(150),
    customer_phone VARCHAR(20),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guest_count INT NOT NULL,
    special_request VARCHAR(500),
    status ENUM('PENDING','CONFIRMED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reservation_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);