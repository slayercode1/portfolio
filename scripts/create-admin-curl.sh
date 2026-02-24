#!/bin/bash

# Script to create admin user using curl
# This can be used to create an admin user if one doesn't exist

ADMIN_EMAIL="${ADMIN_EMAIL:-admin@portfolio.com}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-Admin123!}"

echo "Creating admin user via API..."
echo "Email: $ADMIN_EMAIL"

# Wait for the application to be ready
echo "Waiting for application to be ready..."
until curl -s http://localhost:3000/api/health > /dev/null 2>&1; do
  echo "Waiting for app..."
  sleep 2
done

echo "Application is ready!"

# Execute the create-admin script via Docker
docker exec portfolio-web node /app/scripts/create-admin.js

echo "Done!"
