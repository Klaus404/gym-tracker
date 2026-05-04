#!/bin/bash

echo "=== Fresh Start Gym Tracker ==="

# Stop and clean everything
echo "🛑 Stopping services..."
sudo docker-compose down -v

# Clean up old containers and volumes
echo "🧹 Cleaning up..."
sudo docker system prune -f
sudo docker volume prune -f

# Start fresh
echo "🚀 Starting services..."
sudo docker-compose up --build -d

echo "⏳ Waiting for services to initialize..."
sleep 30

echo "📊 Checking status:"
sudo docker-compose ps

echo ""
echo "🔍 Check logs:"
echo "Database: sudo docker-compose logs db"
echo "Keycloak: sudo docker-compose logs keycloak"
echo "Spring Boot: sudo docker-compose logs gym-tracker"

echo ""
echo "📋 Expected URLs:"
echo "- Database: localhost:5432"
echo "- Keycloak: http://localhost:8081"
echo "- Keycloak Admin: http://localhost:8081/admin"
echo "- Backend: http://localhost:8080 (will take 2-3 minutes)"

echo ""
echo "⚠️  If Keycloak fails to start, wait 2 more minutes and check logs"