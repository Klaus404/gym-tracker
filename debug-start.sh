#!/bin/bash

echo "=== Gym Tracker Debug Script ==="

# Check if Docker is running
if ! sudo docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"

# Stop existing containers
echo "🛑 Stopping existing containers..."
sudo docker-compose down

# Clean up any orphaned containers
echo "🧹 Cleaning up..."
sudo docker system prune -f

# Start services
echo "🚀 Starting services..."
sudo docker-compose up --build -d

# Wait a bit
echo "⏳ Waiting for services to start..."
sleep 20

# Check status
echo "📊 Checking service status..."
sudo docker-compose ps

echo ""
echo "📋 Service URLs:"
echo "  - Backend: http://localhost:8080"
echo "  - Keycloak: http://localhost:8081"
echo "  - Keycloak Admin: http://localhost:8081/admin"

echo ""
echo "🔍 To see logs: sudo docker-compose logs -f"
echo "🛑 To stop: sudo docker-compose down"