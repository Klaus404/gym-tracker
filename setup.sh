#!/bin/bash

echo "Stopping existing containers..."
docker-compose down

# Build and start services
echo "Starting services (this will take a few minutes for first startup)..."
docker-compose up --build -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 30

# Check service status
echo "Checking service status..."
docker-compose ps

echo ""
echo "=== Gym Tracker Setup Complete ==="
echo "Keycloak Admin Console: http://localhost:8081/admin"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "Gym Tracker Backend: http://localhost:8080"
echo ""
echo "Next steps:"
echo "1. Open Keycloak Admin Console"
echo "2. Create 'gym-tracker' realm"
echo "3. Create 'gym-tracker-app' client with redirect URI: http://localhost:8080/login/oauth2/code/keycloak"
echo "4. Test authentication at: http://localhost:8080/oauth2/authorization/keycloak"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
