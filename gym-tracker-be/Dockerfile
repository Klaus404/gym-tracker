# Stage 1: Build Stage
FROM gradle:8.5-jdk21 AS build

# Set the working directory
WORKDIR /home/gradle/src

# Copy Gradle files
COPY settings.gradle gradle/wrapper/gradle-wrapper.properties build.gradle ./

# Copy source code
COPY src ./src

# Run Gradle build
RUN gradle build --no-daemon

# Stage 2: Run Stage
FROM eclipse-temurin:21-jre

# Expose application port
EXPOSE 8080

# Create /app directory for the application
RUN mkdir /app

# Copy the built JAR from the build stage
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar

# Entry point for running the Spring Boot application
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/spring-boot-application.jar"]
