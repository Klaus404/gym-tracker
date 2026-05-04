#!/bin/bash

echo "=== Fixing Gym Tracker Issues ==="

# Stop all services
echo "🛑 Stopping all services..."
sudo docker-compose down

# Remove volumes to ensure clean start
echo "🧹 Cleaning up database volumes..."
sudo docker volume rm gym-tracker_pgdata 2>/dev/null || echo "Volume not found, continuing..."

# Start with clean state
echo "🚀 Starting services clean..."
sudo docker-compose up --build -d

echo "⏳ Waiting for database (30 seconds)..."
sleep 30

echo "⏳ Waiting for Keycloak initialization (60 seconds)..."
sleep 60

echo "📊 Checking service status..."
sudo docker-compose ps

echo ""
echo "🔍 Checking database connection..."
sudo docker-compose exec db psql -U klaus -d gym_tracker -c "\l"

echo ""
echo "🔍 Checking Keycloak database connection..."
sudo docker-compose exec keycloak kc show-config || echo "Keycloak not ready yet"

echo ""
echo "📋 Services should be ready soon!"
echo "- Backend: http://localhost:8080 (may need 2-3 more minutes)"
echo "- Keycloak: http://localhost:8081"
echo "- Keycloak Admin: http://localhost:8081/admin"

echo ""
echo "🔍 To see logs: sudo docker-compose logs -f"