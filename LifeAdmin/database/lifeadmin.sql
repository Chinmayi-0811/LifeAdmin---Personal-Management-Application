-- =========================================
-- LifeAdmin Database Setup Script
-- =========================================
-- Run this script in MySQL before starting the backend for the first time.
-- The backend also has createDatabaseIfNotExist=true and
-- spring.jpa.hibernate.ddl-auto=update, so tables will be created/updated
-- automatically on startup. This script is provided so you can create the
-- database manually and inspect the schema if you prefer.

CREATE DATABASE IF NOT EXISTS lifeadmin
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE lifeadmin;

-- =========================================
-- users table
-- =========================================
CREATE TABLE IF NOT EXISTS users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    password    VARCHAR(255)  NOT NULL
);

-- =========================================
-- life_items table
-- =========================================
CREATE TABLE IF NOT EXISTS life_items (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(150)  NOT NULL,
    description VARCHAR(1000),
    category    VARCHAR(20)   NOT NULL,
    due_date    DATE,
    amount      DECIMAL(10,2),
    status      VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    priority    VARCHAR(20)   NOT NULL DEFAULT 'MEDIUM',
    recurring   BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id     BIGINT        NOT NULL,

    CONSTRAINT fk_life_items_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_category
        CHECK (category IN ('BILL','TASK','DOCUMENT','APPOINTMENT','SUBSCRIPTION','REMINDER','OTHER')),

    CONSTRAINT chk_status
        CHECK (status IN ('PENDING','COMPLETED','CANCELLED')),

    CONSTRAINT chk_priority
        CHECK (priority IN ('LOW','MEDIUM','HIGH'))
);

CREATE INDEX idx_life_items_user_id ON life_items(user_id);
CREATE INDEX idx_life_items_due_date ON life_items(due_date);
CREATE INDEX idx_life_items_status ON life_items(status);
