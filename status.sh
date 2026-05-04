#!/bin/bash

###############################################################################
# Gym Tracker - Status and Health Check
# 
# This script displays the status of all services and performs health checks
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "$SCRIPT_DIR"

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║      🔍 Gym Tracker - Service Status & Health Check        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if docker compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${YELLOW}📊 Container Status:${NC}"
echo "────────────────────────────────────────────────────────────"
docker-compose ps
echo ""

echo -e "${YELLOW}🏥 Service Health Checks:${NC}"
echo "────────────────────────────────────────────────────────────"

# Frontend Health Check
echo -n "Frontend (port 4200):          "
if curl -s http://localhost:4200 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ UNREACHABLE${NC}"
fi

# Backend Health Check
echo -n "Backend API (port 8080):       "
if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ UNREACHABLE${NC}"
fi

# Database Health Check
echo -n "Database (port 5432):          "
if nc -z localhost 5432 2>/dev/null; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ UNREACHABLE${NC}"
fi

# Keycloak Health Check
echo -n "Keycloak (port 8081):          "
if curl -s http://localhost:8081 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ UNREACHABLE${NC}"
fi

echo ""
echo -e "${YELLOW}📍 Service URLs:${NC}"
echo "────────────────────────────────────────────────────────────"
echo -e "  Frontend:   ${GREEN}http://localhost:4200${NC}"
echo -e "  Backend:    ${GREEN}http://localhost:8080${NC}"
echo -e "  Keycloak:   ${GREEN}http://localhost:8081${NC}"
echo -e "  Database:   ${GREEN}localhost:5432${NC}"
echo ""

echo -e "${YELLOW}🛠️  Useful Commands:${NC}"
echo "────────────────────────────────────────────────────────────"
echo "  View logs:        ./logs.sh"
echo "  Stop services:    ./stop.sh"
echo "  Restart services: ./start.sh restart"
echo "  Exec frontend:    docker-compose exec gym-tracker-fe sh"
echo "  Exec backend:     docker-compose exec gym-tracker bash"
echo ""
