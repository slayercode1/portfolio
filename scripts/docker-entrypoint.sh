#!/bin/sh
set -e

# Extract host and port from DATABASE_URL
DB_HOST=$(echo "$DATABASE_URL" | sed -n 's|.*@\([^:/]*\).*|\1|p')
DB_PORT=$(echo "$DATABASE_URL" | sed -n 's|.*:\([0-9]*\)/.*|\1|p')
DB_PORT=${DB_PORT:-5432}

echo "==> Waiting for database at ${DB_HOST}:${DB_PORT}..."
MAX_RETRIES=30
RETRY_COUNT=0

until node -e "const net=require('net');const s=net.connect(${DB_PORT},'${DB_HOST}',()=>{s.end();process.exit(0)});s.on('error',()=>process.exit(1));setTimeout(()=>process.exit(1),2000)" 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
    echo "ERROR: Could not connect to database after $MAX_RETRIES attempts"
    exit 1
  fi
  echo "  Waiting for database... ($RETRY_COUNT/$MAX_RETRIES)"
  sleep 2
done

echo "==> Database is ready"

echo "==> Pushing database schema..."
npx prisma db push --url "$DATABASE_URL"

echo "==> Creating admin user..."
node /app/scripts/create-admin.cjs

echo "==> Starting server..."
exec node server.js
