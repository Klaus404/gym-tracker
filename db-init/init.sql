-- Ensure the table exists before inserting data
CREATE TABLE IF NOT EXISTS exercise (
    id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(255) NOT NULL,
    number_of_reps INT NOT NULL,
    weight FLOAT NOT NULL,
    mentions TEXT,
    user_id VARCHAR(255) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(exercise_name, user_id)
    );

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
    );
