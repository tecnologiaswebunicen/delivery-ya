#!/usr/bin/env bash
set -euo pipefail

TAG="${1:?Uso: ./deploy.sh <tag>}"
cd "$(dirname "$0")"
export APP_TAG="$TAG"

docker compose pull app                                  # 1. bajar imagen nueva
# Sin migraciones: el esquema lo maneja TypeORM con DB_SYNCHRONIZE.
docker compose up -d --no-deps --wait app                # 2. recrear solo "app" y esperar healthcheck

# 3. fijar versión para futuros `up`, sin pisar el resto del .env (passwords)
touch .env
grep -v '^APP_TAG=' .env > .env.tmp || true
echo "APP_TAG=$TAG" >> .env.tmp
mv .env.tmp .env
chmod 600 .env

docker image prune -f                                    # 4. limpiar imágenes viejas
