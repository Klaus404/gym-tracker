# Gym Tracker - Quick Start Guide

## Prerequisites

- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Docker Compose**: Included with Docker Desktop, or [install separately](https://docs.docker.com/compose/install/)

## Quick Start

### Start the Application

From the project root directory, run:

```bash
./start.sh
```

This will:
1. ✅ Build all Docker images
2. ✅ Start all services (Frontend, Backend, Database, Keycloak)
3. ✅ Display service URLs and credentials
4. ✅ Show initial logs

### Access the Application

Once started, access the app at:

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **Keycloak**: http://localhost:8081

### Stop the Application

```bash
./stop.sh
```

This will stop and remove all containers while preserving data in Docker volumes.

## Common Commands

### View Logs

```bash
# Real-time logs from all services
docker-compose logs -f

# Logs from specific service
docker-compose logs -f gym-tracker-fe        # Frontend
docker-compose logs -f gym-tracker           # Backend
docker-compose logs -f db                    # Database
docker-compose logs -f keycloak              # Keycloak
```

### Restart Services

```bash
./start.sh restart
```

### Rebuild Containers

```bash
docker-compose up -d --build
```

### Clean Up Everything (including data)

```bash
docker-compose down -v
```

## Service Details

### Frontend (Angular)
- **Port**: 4200
- **Container**: gym-tracker-fe
- **URL**: http://localhost:4200

### Backend (Spring Boot)
- **Port**: 8080
- **Container**: gym-tracker-service
- **URL**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health

### Database (PostgreSQL)
- **Port**: 5432
- **Container**: gym-tracker-db
- **Username**: klaus
- **Password**: P@ssw0rd!
- **Database**: gym_tracker

### Authentication (Keycloak)
- **Port**: 8081
- **Container**: gym-tracker-keycloak
- **URL**: http://localhost:8081
- **Admin Username**: admin
- **Admin Password**: admin123
- **Realm**: gym-tracker
- **Client ID**: gym-tracker-app

## Troubleshooting

### Port Already in Use

If a port is already in use, modify the port mappings in `docker-compose.yaml`:

```yaml
ports:
  - "4200:4200"  # Change first 4200 to your desired port
```

### Container Won't Start

Check logs:
```bash
docker-compose logs -f
```

### Database Connection Issues

Ensure the database is healthy:
```bash
docker-compose ps
```

All containers should show "Up" status.

### Rebuild Everything from Scratch

```bash
docker-compose down -v
docker-compose up -d --build
```

## Development

### Access Container Shell

```bash
# Frontend
docker-compose exec gym-tracker-fe sh

# Backend
docker-compose exec gym-tracker bash

# Database
docker-compose exec db psql -U klaus -d gym_tracker
```

### View Real-Time Logs

```bash
docker-compose logs -f gym-tracker-fe
```

## Configuration

All service configurations are defined in `docker-compose.yaml`:

- Database credentials
- Keycloak settings
- API URLs
- Port mappings
- Volume mounts

Modify this file to change service configurations.

## Support

For issues or questions, refer to:
- Backend: `gym-tracker-be/README.md`
- Frontend: `gym-tracker-fe/gym-tracker/README.md`
- Keycloak Setup: `KEYCLOAK-SETUP.md`
