-- Ensure the table exists before inserting data
CREATE TABLE IF NOT EXISTS exercise (
    id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(255) NOT NULL UNIQUE,
    number_of_reps INT NOT NULL,
    weight FLOAT NOT NULL,
    mentions TEXT
    );

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
    );
