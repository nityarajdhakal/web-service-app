
-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS translations CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table with all required fields
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    article_no VARCHAR(100),
    product_name VARCHAR(255) NOT NULL,
    in_price NUMERIC(10, 2) DEFAULT 0,
    price NUMERIC(10, 2) DEFAULT 0,
    unit VARCHAR(50),
    in_stock INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Translations table
CREATE TABLE translations (
    id SERIAL PRIMARY KEY,
    page VARCHAR(50) NOT NULL,
    lang VARCHAR(10) NOT NULL,
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_products_article_no ON products(article_no);
CREATE INDEX idx_products_product_name ON products(product_name);
CREATE INDEX idx_translations_page_lang ON translations(page, lang);
CREATE INDEX idx_translations_key ON translations(key);

