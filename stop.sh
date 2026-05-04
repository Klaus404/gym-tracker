#!/bin/bash

###############################################################################
# Gym Tracker - Stop Docker Containers
# 
# This script stops and removes all Gym Tracker Docker containers
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
echo "║          🛑 Gym Tracker - Stopping Services                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

cd "$SCRIPT_DIR"

if docker-compose down; then
    echo -e "${GREEN}✅ All services stopped successfully!${NC}"
    echo ""
    echo -e "${YELLOW}📊 Containers removed:${NC}"
    echo "  - gym-tracker-fe (Frontend)"
    echo "  - gym-tracker-service (Backend)"
    echo "  - gym-tracker-db (Database)"
    echo "  - gym-tracker-keycloak (Keycloak)"
    echo ""
    echo -e "${GREEN}ℹ️  Data is preserved in Docker volumes${NC}"
    echo "To completely remove volumes and data, run:"
    echo -e "  ${YELLOW}docker-compose down -v${NC}"
else
    echo -e "${RED}❌ Failed to stop services${NC}"
    exit 1
fi
