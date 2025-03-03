-- Ensure the table exists before inserting data
CREATE TABLE IF NOT EXISTS exercise (
    id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(255) NOT NULL UNIQUE,
    number_of_reps INT NOT NULL,
    weight FLOAT NOT NULL,
    mentions TEXT
    );
