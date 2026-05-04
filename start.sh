#!/bin/bash

###############################################################################
# Gym Tracker - Docker Compose Startup Script
# 
# This script starts the entire Gym Tracker application stack using Docker
# Compose, including:
# - Angular Frontend (port 4200)
# - Spring Boot Backend (port 8080)
# - PostgreSQL Database (port 5432)
# - Keycloak OAuth2 Server (port 8081)
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           🏋️  Gym Tracker - Docker Compose Start           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed or not in PATH${NC}"
    echo "Please install Docker from https://www.docker.com/get-started"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed or not in PATH${NC}"
    echo "Please install Docker Compose or use 'docker compose'"
    exit 1
fi

# Check if docker-compose.yaml exists
if [ ! -f "$SCRIPT_DIR/docker-compose.yaml" ]; then
    echo -e "${RED}❌ docker-compose.yaml not found in $SCRIPT_DIR${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Checking prerequisites...${NC}"
docker --version
docker-compose --version
echo ""

# Optional: stop existing containers
if [ "$1" == "restart" ]; then
    echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
    cd "$SCRIPT_DIR"
    docker-compose down || true
    echo ""
fi

# Build and start containers
echo -e "${YELLOW}🔨 Building and starting Docker containers...${NC}"
echo "This may take a few minutes on first run..."
echo ""

cd "$SCRIPT_DIR"

# Use docker-compose up with build flag
if docker-compose up -d --build; then
    echo -e "${GREEN}✅ All containers started successfully!${NC}"
    echo ""
    echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}🎉 Gym Tracker is now running!${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📍 Access the application:${NC}"
    echo -e "  Frontend:  ${GREEN}http://localhost:4200${NC}"
    echo -e "  Backend:   ${GREEN}http://localhost:8080${NC}"
    echo -e "  Database:  ${GREEN}localhost:5432${NC}"
    echo -e "  Keycloak:  ${GREEN}http://localhost:8081${NC}"
    echo ""
    echo -e "${YELLOW}🔐 Keycloak Admin Credentials:${NC}"
    echo -e "  Username: ${GREEN}admin${NC}"
    echo -e "  Password: ${GREEN}admin123${NC}"
    echo ""
    echo -e "${YELLOW}📊 Database Credentials:${NC}"
    echo -e "  Username: ${GREEN}klaus${NC}"
    echo -e "  Password: ${GREEN}P@ssw0rd!${NC}"
    echo ""
    echo -e "${YELLOW}🛠️  Useful commands:${NC}"
    echo -e "  View logs:     ${GREEN}docker-compose logs -f${NC}"
    echo -e "  Stop:          ${GREEN}docker-compose down${NC}"
    echo -e "  Restart:       ${GREEN}./start.sh restart${NC}"
    echo -e "  Rebuild:       ${GREEN}docker-compose up -d --build${NC}"
    echo ""
    
    # Wait a moment and show initial logs
    sleep 3
    echo -e "${YELLOW}📝 Initial service logs:${NC}"
    echo "────────────────────────────────────────────────────────────"
    docker-compose logs --tail=20
    echo "────────────────────────────────────────────────────────────"
    echo ""
    echo -e "${GREEN}ℹ️  To view logs in real-time, run:${NC}"
    echo -e "   ${GREEN}docker-compose logs -f${NC}"
    echo ""
else
    echo -e "${RED}❌ Failed to start Docker containers${NC}"
    echo "Please check the error messages above and try again."
    exit 1
fi
