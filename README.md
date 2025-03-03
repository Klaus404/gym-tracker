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

## Running the Application with Docker Compose

### 1. Clone the Repository
Clone the repository to your local machine:

```sh
git clone https://github.com/your-username/gym-tracker.git
cd gym-tracker
```

### 2. Build and Run the Containers
To build and start the application with Docker Compose, run:

```sh
docker-compose up --build
```

This will:
- Build the Docker images for the application and the PostgreSQL database.
- Start the containers as defined in `docker-compose.yml`.

The application will be accessible at: [http://localhost:8080](http://localhost:8080).

### 3. Connecting to the PostgreSQL Database

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

### 4. Stopping the Application
To stop the running containers, use:

```sh
docker-compose down
```

### 5. Viewing Logs
To view the logs of the Gym Tracker service, run:

```sh
docker-compose logs gym-tracker-service
```

For database logs:

```sh
docker-compose logs gym-tracker-db
```


## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.