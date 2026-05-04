# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with --ignore-scripts flag
RUN npm ci --ignore-scripts

# Copy application code
COPY . .

# Build the Angular app
RUN npm run build

# Runtime stage
FROM nginx:alpine

# Remove default nginx config and files
RUN rm /etc/nginx/conf.d/default.conf && rm /usr/share/nginx/html/index.html

# Copy custom nginx config from builder (which has all source files)
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder
COPY --from=builder /app/dist/gym-tracker/browser /usr/share/nginx/html

# Expose port
EXPOSE 4200

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
