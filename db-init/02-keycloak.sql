-- Create keycloak database if it doesn't exist
SELECT 'CREATE DATABASE keycloak'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'keycloak')\gexec;

-- Create keycloak user if it doesn't exist
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'keycloak') THEN
      
      CREATE ROLE keycloak LOGIN PASSWORD 'keycloak_password';
   END IF;
END
$do$;

-- Grant privileges to keycloak user
GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;