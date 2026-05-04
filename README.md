# Gym Tracker Application

## Overview
The **Gym Tracker** application allows users to track their exercise routines, including details like exercise name, number of reps, weight lifted, and additional mentions. It is built using **Java 21**, **Spring Boot 3**, and **PostgreSQL**.

## Features
- Add, update, delete, and view exercises
- Track repetitions, weight lifted, and additional details for each exercise
- RESTful API endpoints for managing exercises
- Runs inside Docker containers using **Docker Compose**

## Prerequisites
Before running the app, ensure you have the following installed:

- **Docker**
- **Docker Compose**

## 🚀 Quick Start (Recommended)

The easiest way to start the application is using the provided startup scripts:

### Start the Application

```bash
./start.sh
```

This will start all services and display URLs and credentials.

### Stop the Application

```bash
./stop.sh
```

### View Service Logs

```bash
./logs.sh
```

### Check Service Status

```bash
./status.sh
```

**For more details, see [SCRIPTS.md](SCRIPTS.md)**

---

## Running the Application with Docker Compose

### 1. Clone the Repository
Clone the repository to your local machine:

```sh
git clone https://github.com/your-username/gym-tracker.git
cd gym-tracker
```

### 2. Build and Run the Containers

#### Using Startup Script (Recommended)
```bash
./start.sh
```

#### Using Docker Compose Directly
```sh
docker-compose up --build
```

This will:
- Build the Docker images for the application and the PostgreSQL database.
- Start the containers as defined in `docker-compose.yaml`.

### 3. Access the Application

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:4200 | Angular Web App |
| Backend | http://localhost:8080 | Spring Boot API |
| Keycloak | http://localhost:8081 | OAuth2 Authentication |
| Database | localhost:5432 | PostgreSQL Database |

### 4. Connecting to the PostgreSQL Database

#### Option 1: Connect via Docker CLI
Run the following command to connect to the database:

```sh
docker exec -it gym-tracker-db psql -U klaus -d gym_tracker
```

#### Option 2: Connect Using a Database Client (e.g., pgAdmin, DBeaver)
Use the following connection details:

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `gym_tracker`
- **Username**: `klaus`
- **Password**: `P@ssw0rd!`

### 5. Stopping the Application

#### Using Startup Script
```bash
./stop.sh
```

#### Using Docker Compose Directly
```sh
docker-compose down
```

### 6. Viewing Logs

#### Using Logs Script (Interactive)
```bash
./logs.sh
```

#### Using Docker Compose Directly
```sh
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f gym-tracker
docker-compose logs -f gym-tracker-fe
docker-compose logs -f keycloak
```


## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.