# Gym Tracker Frontend Development Plan

## Project Setup
- [x] Add Angular Material (v19) and CDK
- [x] Configure HttpClient in app.config
- [x] Create Dockerfile for frontend with `--ignore-scripts` flag
- [x] Update docker-compose.yaml to include frontend service
- [x] Update package.json scripts for Docker development

## Core Infrastructure
- [x] Create data models (User, Exercise, Training, Set)
- [x] Create API service layer (api.service.ts)
- [x] Create authentication service (auth.service.ts)
- [x] Create auth guard (auth.guard.ts)

## Layout & Routing
- [x] Create layout component with sidebar navigation
- [x] Set up app routes

## Pages & Components

### Dashboard
- [x] Create dashboard with stats cards
- [x] Display recent trainings
- [x] Quick action buttons

### Exercises
- [ ] Create exercises list page
- [ ] Create exercise create/edit form
- [ ] Add exercise delete functionality
- [ ] Display public exercises

### Trainings
- [ ] Create trainings list page
- [ ] Create training create/edit form
- [ ] Add training delete functionality
- [ ] Filter by date range
- [ ] Filter by exercise name

### Sets
- [ ] Integrate sets within training form
- [ ] Add set create/edit/delete
- [ ] Display sets in training detail view

### Profile
- [ ] Create user profile page
- [ ] Display user information
- [ ] Add sync functionality

## Styling & UX
- [ ] Apply global theme with Angular Material
- [ ] Add responsive design for mobile
- [ ] Create loading states
- [ ] Add error handling and toast notifications

## Testing
- [ ] Test all components
- [ ] Test services
- [ ] Verify Docker build and deployment

## Docker Setup Notes
- Frontend builds with `npm run build --ignore-scripts` equivalent
- Served using `serve` package on port 4200
- Backend URL configured for Docker network communication
- Depends on gym-tracker-service being available