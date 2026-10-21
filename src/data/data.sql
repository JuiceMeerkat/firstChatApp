CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user', 'manager')),
    created_at TIMESTAMP DEFAULT NOW()
    )