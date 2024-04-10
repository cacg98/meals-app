# Use node image as base image
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build

# Use nginx image as the base image for serving the Angular app
FROM nginx:alpine

# Copy the built Angular app from the builder stage to nginx html directory
COPY --from=builder /app/dist/meals-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80
