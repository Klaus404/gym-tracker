#!/bin/bash

###############################################################################
# Gym Tracker - View Logs
# 
# This script provides an interactive way to view logs from different services
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

cd "$SCRIPT_DIR"

# If no argument provided, show menu
if [ -z "$1" ]; then
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║          📋 Gym Tracker - View Service Logs                ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo -e "${YELLOW}Select a service to view logs:${NC}"
    echo ""
    echo "  1) All services"
    echo "  2) Frontend (Angular)"
    echo "  3) Backend (Spring Boot)"
    echo "  4) Database (PostgreSQL)"
    echo "  5) Keycloak (Auth)"
    echo "  6) Last 50 lines of all services"
    echo "  0) Exit"
    echo ""
    read -p "Enter your choice [0-6]: " choice
else
    choice=$1
fi

case $choice in
    1)
        echo -e "${YELLOW}📝 Showing logs from all services...${NC}"
        docker-compose logs -f
        ;;
    2)
        echo -e "${YELLOW}📝 Showing logs from Frontend...${NC}"
        docker-compose logs -f gym-tracker-fe
        ;;
    3)
        echo -e "${YELLOW}📝 Showing logs from Backend...${NC}"
        docker-compose logs -f gym-tracker
        ;;
    4)
        echo -e "${YELLOW}📝 Showing logs from Database...${NC}"
        docker-compose logs -f db
        ;;
    5)
        echo -e "${YELLOW}📝 Showing logs from Keycloak...${NC}"
        docker-compose logs -f keycloak
        ;;
    6)
        echo -e "${YELLOW}📝 Showing last 50 lines from all services...${NC}"
        docker-compose logs --tail=50
        ;;
    0)
        echo -e "${GREEN}Exiting...${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice. Please try again.${NC}"
        exit 1
        ;;
esac
