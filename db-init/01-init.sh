#!/bin/bash
set -e

# Create gym_tracker database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create gym_tracker database if it doesn't exist
    SELECT 'CREATE DATABASE gym_tracker'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'gym_tracker')\\gexec
    
    -- Switch to gym_tracker database and create tables
    \\c gym_tracker
    
    -- Create users table
    CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create exercises table
    CREATE TABLE IF NOT EXISTS exercises (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        muscle_group VARCHAR(100),
        user_id VARCHAR(255) REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create workout sessions table
    CREATE TABLE IF NOT EXISTS workout_sessions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id),
        session_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create exercise sets table
    CREATE TABLE IF NOT EXISTS exercise_sets (
        id SERIAL PRIMARY KEY,
        workout_session_id INTEGER REFERENCES workout_sessions(id),
        exercise_id INTEGER REFERENCES exercises(id),
        user_id VARCHAR(255) REFERENCES users(id),
        reps INTEGER NOT NULL,
        weight FLOAT,
        sets INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Insert default exercises
    INSERT INTO exercises (name, description, muscle_group, user_id) VALUES 
    ('Squat', 'Compound leg exercise targeting quads, glutes, and hamstrings', 'Legs', 'system'),
    ('Bench Press', 'Compound upper body exercise targeting chest, shoulders, and triceps', 'Chest', 'system'),
    ('Deadlift', 'Full-body compound exercise targeting back, glutes, and hamstrings', 'Back', 'system'),
    ('Pull-up', 'Upper body exercise targeting back and biceps', 'Back', 'system'),
    ('Overhead Press', 'Compound shoulder exercise targeting deltoids and triceps', 'Shoulders', 'system'),
    ('Bent-over Row', 'Back exercise targeting lats and rhomboids', 'Back', 'system'),
    ('Lunge', 'Unilateral leg exercise for quads and glutes', 'Legs', 'system'),
    ('Bicep Curl', 'Isolation exercise for biceps', 'Arms', 'system'),
    ('Tricep Extension', 'Isolation exercise for triceps', 'Arms', 'system'),
    ('Plank', 'Core stability exercise', 'Core', 'system')
    ON CONFLICT DO NOTHING;
EOSQL

# Create keycloak database and user
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create keycloak database if it doesn't exist
    SELECT 'CREATE DATABASE keycloak'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'keycloak')\\gexec
    
    -- Create keycloak user if it doesn't exist
    DO
    \\$do\\$
    BEGIN
       IF NOT EXISTS (
          SELECT FROM pg_catalog.pg_roles
          WHERE  rolname = 'keycloak') THEN
          
          CREATE ROLE keycloak LOGIN PASSWORD 'keycloak_password';
       END IF;
    END
    \\$do\\$;
    
    -- Grant privileges to keycloak user
    GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
EOSQL

# Grant schema privileges in keycloak database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "keycloak" <<-EOSQL
    GRANT ALL ON SCHEMA public TO keycloak;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO keycloak;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO keycloak;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO keycloak;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO keycloak;
EOSQL

echo "Database initialization completed successfully!"