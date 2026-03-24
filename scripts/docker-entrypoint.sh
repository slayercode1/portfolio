#!/bin/sh
set -e

echo "==> Migration entrypoint starting..."

# pg is a production dep available in standalone
echo "==> Waiting for database connection..."
MAX_RETRIES=30
RETRY_COUNT=0

until node --input-type=module -e "
  import pg from 'pg';
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  pool.query('SELECT 1')
    .then(() => { pool.end(); process.exit(0); })
    .catch(() => { pool.end(); process.exit(1); });
" 2>/dev/null; do
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
cd /app && node node_modules/prisma/build/bin.mjs db push --skip-generate

# Idempotent: skips if user already exists
echo "==> Creating admin user..."
node /app/scripts/create-admin.js

echo "==> Migration completed successfully"
