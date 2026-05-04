# AGENTS.md - Gym Tracker Developer Guide

This document provides guidelines for agents working on the Gym Tracker codebase.

## Project Overview

Gym Tracker is a full-stack application for tracking exercise routines:
- **Frontend**: Angular 19 with standalone components
- **Backend**: Java 21 + Spring Boot 3 + PostgreSQL
- **Auth**: OAuth2 with Keycloak

## Build, Run & Test Commands

### Frontend (Angular)

```bash
cd gym-tracker-fe/gym-tracker

# Install dependencies
npm install

# Start development server
npm start        # or: ng serve
npm run watch    # watch mode with dev config

# Build for production
npm run build

# Run tests
npm test                         # runs all tests (Karma + Jasmine)
npm test -- --include="**/exercise-list.component.spec.ts"  # single test file

# Generate coverage report
npm test -- --code-coverage
```

### Backend (Java/Spring Boot)

```bash
cd gym-tracker-be

# Build the application
./gradlew build

# Run tests
./gradlew test                              # all tests (JUnit 5)
./gradlew test --tests "com.klaus.gymtracker.GymTrackerApplicationTests"  # single test class
./gradlew test --tests "com.klaus.gymtracker.*"  # tests matching pattern

# Run application
./gradlew bootRun
```

### Docker (Full Stack)

```bash
# Start all services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f gym-tracker-service
```

## Code Style Guidelines

### Java (Backend)

**General**
- Follows standard Spring Boot conventions
- Use constructor injection (not @Autowired field injection)
- Packages: `com.klaus.gymtracker.{controller,service,entity,dao}`

**Naming**
- Classes: PascalCase (e.g., `ExerciseController`, `UserService`)
- Methods: camelCase (e.g., `getExercisesForUser`, `saveNewExercise`)
- Variables: camelCase
- Database columns: snake_case (mapped via `@Column` annotations)

**Lombok Usage**
- Use `@Getter`, `@Setter`, `@AllArgsConstructor`, `@NoArgsConstructor`
- Avoid手写 getters/setters when Lombok can generate them

**Error Handling**
- Controllers return `ResponseEntity<?>` with try-catch blocks
- Return `ResponseEntity.badRequest().body("Error: " + e.getMessage())` on failure
- Return `ResponseEntity.notFound().build()` for 404s

**Imports Order**
1. java.* packages
2. javax.* packages
3. org.springframework.* packages
4. other org.* packages
5. com.klaus.gymtracker.* packages
6. lombok annotations

### Angular/TypeScript (Frontend)

**General**
- Use standalone components (Angular 19+ style)
- Strict TypeScript enabled (`strict: true` in tsconfig.json)
- Use modern Angular features: signals, control flow syntax (@if, @for)

**Component Structure**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  imports: [RouterOutlet, /* other imports */],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'  // Note: singular, not styleUrls
})
export class ExampleComponent {
  // component logic
}
```

**Naming Conventions**
- Components: kebab-case for files (`exercise-list.component.ts`), PascalCase for classes
- Services: `*.service.ts` suffix
- Models: `*.model.ts` suffix
- Use TypeScript strict typing - avoid `any`

**Imports**
- Use absolute imports from `@angular/*` for Angular modules
- Use relative imports for local components/services

**Template & Style**
- Use control flow syntax: `@if`, `@for`, `@else`
- Avoid `*ngIf`, `*ngFor` where possible (new Angular 17+ syntax)
- One component per file
- Keep templates simple; move logic to component class

## Architecture Notes

### Backend Layer Structure
```
controller/    - @RestController, handles HTTP requests
service/       - Business logic, @Service
entity/        - JPA entities, mapped to DB tables
dao/           - Repository interfaces, extends JpaRepository
```

### Frontend Structure
```
app/
├── exercises/
│   ├── components/    # UI components
│   ├── services/     # HTTP services
│   └── models/       # TypeScript interfaces
├── app.component.ts  # Root component
└── app.config.ts     # App configuration
```

## Testing Guidelines

### Java Tests
- Use JUnit 5 (`@SpringBootTest`, `@Test`)
- Place tests in `src/test/java/com/klaus/gymtracker/`
- Test class naming: `{ClassName}Tests.java`

### Angular Tests
- Use Karma + Jasmine
- Test file naming: `*.component.spec.ts`
- Use component's public API for testing

## Common Issues

- **Hot Reload**: Run `npm run watch` in frontend for live reload
- **Database**: Ensure PostgreSQL container is running before starting backend
- **OAuth2**: Keycloak must be configured before login works (see KEYCLOAK-SETUP.md)
- **Tests**: Backend tests may fail if DB is not available - use `@SpringBootTest` which starts context
