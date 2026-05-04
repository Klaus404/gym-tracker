# 🚀 Gym Tracker - Startup Scripts

## Overview

The Gym Tracker project includes several convenient bash scripts to manage the Docker Compose environment from the project root directory.

## Available Scripts

### 1. **`start.sh`** - Start All Services ⭐

Starts the entire Gym Tracker application stack.

```bash
./start.sh
```

**What it does:**
- ✅ Checks Docker and Docker Compose installation
- ✅ Builds all Docker images
- ✅ Starts all containers (Frontend, Backend, Database, Keycloak)
- ✅ Displays service URLs and credentials
- ✅ Shows initial service logs

**Options:**
```bash
./start.sh restart    # Stop existing containers and restart everything
```

**Output:**
```
Frontend:  http://localhost:4200
Backend:   http://localhost:8080
Database:  localhost:5432
Keycloak:  http://localhost:8081

Keycloak Admin:
  Username: admin
  Password: admin123

Database Credentials:
  Username: klaus
  Password: P@ssw0rd!
```

---

### 2. **`stop.sh`** - Stop All Services

Stops and removes all running containers.

```bash
./stop.sh
```

**What it does:**
- ✅ Stops all running containers
- ✅ Removes containers from Docker
- ✅ Preserves data in Docker volumes (no data loss)

**Note:** To completely remove volumes and data:
```bash
docker-compose down -v
```

---

### 3. **`logs.sh`** - View Service Logs

Interactive script to view logs from specific services or all services.

```bash
./logs.sh
```

**Menu options:**
```
1) All services
2) Frontend (Angular)
3) Backend (Spring Boot)
4) Database (PostgreSQL)
5) Keycloak (Auth)
6) Last 50 lines of all services
0) Exit
```

**Direct usage:**
```bash
./logs.sh 1              # View all logs
./logs.sh 2              # View frontend logs
./logs.sh 3              # View backend logs
docker-compose logs -f   # Alternative: real-time all logs
```

---

### 4. **`status.sh`** - Check Service Status

Displays the status of all services and performs health checks.

```bash
./status.sh
```

**What it shows:**
- ✅ Container status (running, stopped, etc.)
- ✅ Health checks for each service
- ✅ Service URLs
- ✅ Useful commands reference

**Health checks performed:**
- Frontend (port 4200)
- Backend API (port 8080)
- Database (port 5432)
- Keycloak (port 8081)

---

## Quick Start Examples

### First Time Setup

```bash
# Start everything
./start.sh

# Wait for all services to start (2-5 minutes)
# Then open http://localhost:4200
```

### Daily Development

```bash
# Start services
./start.sh

# View logs while developing
./logs.sh

# Check service health
./status.sh

# When done, stop services
./stop.sh
```

### Troubleshooting

```bash
# View backend logs
./logs.sh 3

# Check which containers are running
./status.sh

# Restart everything
./start.sh restart

# View all logs with timestamps
docker-compose logs --tail=100 -t
```

---

## Manual Docker Commands

If you prefer not to use scripts, use these direct Docker Compose commands:

### Start Services
```bash
docker-compose up -d --build
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f gym-tracker-fe
docker-compose logs -f gym-tracker
docker-compose logs -f db
docker-compose logs -f keycloak
```

### Check Status
```bash
docker-compose ps
```

### Execute Shell in Container
```bash
docker-compose exec gym-tracker-fe sh
docker-compose exec gym-tracker bash
docker-compose exec db psql -U klaus -d gym_tracker
```

---

## Services Overview

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Frontend | 4200 | http://localhost:4200 | Angular Web Application |
| Backend | 8080 | http://localhost:8080 | Spring Boot REST API |
| Database | 5432 | localhost:5432 | PostgreSQL Database |
| Keycloak | 8081 | http://localhost:8081 | OAuth2 Authentication |

---

## Troubleshooting

### "Command not found: docker-compose"
Install Docker Compose: https://docs.docker.com/compose/install/

### "Port already in use"
Modify port mappings in `docker-compose.yaml`:
```yaml
ports:
  - "4200:4200"  # Change first number to your desired port
```

### "Container exits immediately"
Check logs:
```bash
./logs.sh
```

### "Containers running but services unreachable"
Run health checks:
```bash
./status.sh
```

### "Complete reset needed"
```bash
docker-compose down -v  # Remove all data
./start.sh              # Fresh start
```

---

## File Structure

```
gym-tracker/
├── start.sh              ← Start all services
├── stop.sh               ← Stop all services
├── logs.sh               ← View service logs
├── status.sh             ← Check service status
├── docker-compose.yaml   ← Service configuration
├── DOCKER-START.md       ← Detailed Docker guide
├── gym-tracker-fe/       ← Frontend (Angular)
├── gym-tracker-be/       ← Backend (Spring Boot)
└── db-init/              ← Database initialization
```

---

## Tips & Tricks

### 1. **Development Workflow**
```bash
# Terminal 1: Start services
./start.sh

# Terminal 2: Watch frontend build
cd gym-tracker-fe/gym-tracker && npm run watch

# Terminal 3: View backend logs
./logs.sh 3
```

### 2. **Database Access**
```bash
docker-compose exec db psql -U klaus -d gym_tracker

# Query example
SELECT * FROM exercises;
```

### 3. **Clear Docker Cache**
```bash
docker-compose down -v
docker image prune -a
./start.sh
```

### 4. **Monitor Resource Usage**
```bash
docker stats
```

---

## Next Steps

1. **Start the app:** `./start.sh`
2. **Check status:** `./status.sh`
3. **View logs:** `./logs.sh`
4. **Access frontend:** http://localhost:4200
5. **Access admin:** http://localhost:8081 (Keycloak)

---

For more information, see:
- `DOCKER-START.md` - Detailed Docker guide
- `README.md` - Project overview
- `docker-compose.yaml` - Service configuration
