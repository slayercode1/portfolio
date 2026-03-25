# Deployment Guide — Portfolio (yann-dev.fr)

## Architecture

```
GitHub (push main) → GitHub Actions → Build images → Push GHCR → Deploy VPS
```

```
Internet → Caddy (HTTPS) → caddy-net → portfolio-web:3000 → db-network → postgres
```

- **App** : Next.js standalone (port 3000, expose uniquement via Caddy)
- **DB** : PostgreSQL 16 (réseau interne, inaccessible depuis l'extérieur)
- **Reverse proxy** : Caddy (HTTPS automatique via Let's Encrypt)
- **Registry** : ghcr.io/slayercode1/portfolio

## Prérequis VPS

- Docker & Docker Compose installés
- Caddy configuré avec le réseau `caddy-net`
- Port 80/443 ouverts (Caddy)
- Port SSH accessible pour le déploiement

### Créer le réseau Caddy (une seule fois)

```bash
docker network create caddy-net
```

### Configuration Caddy (Caddyfile)

```caddyfile
{
    # Email pour Let's Encrypt
    email admin@yann-dev.fr

    # Désactiver la page d'admin Caddy
    admin off

    # TLS strict
    servers {
        protocols h1 h2 h3
    }
}

yann-dev.fr {
    # --- Security Headers ---
    header {
        # Empêcher le MIME sniffing
        X-Content-Type-Options nosniff

        # Protection clickjacking
        X-Frame-Options DENY

        # Bloquer XSS réfléchi (navigateurs legacy)
        X-XSS-Protection "1; mode=block"

        # Politique de referrer stricte
        Referrer-Policy strict-origin-when-cross-origin

        # Forcer HTTPS pendant 1 an + includeSubDomains
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

        # Permissions Policy — désactiver les APIs inutiles
        Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"

        # Content Security Policy
        Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"

        # Masquer la techno serveur
        -Server
        -X-Powered-By
    }

    # --- Rate Limiting (protection brute force) ---
    @admin path /admin* /api/auth/*
    rate_limit @admin {
        zone admin_zone {
            key {remote_host}
            events 20
            window 1m
        }
    }

    @api path /api/*
    rate_limit @api {
        zone api_zone {
            key {remote_host}
            events 60
            window 1m
        }
    }

    # --- Bloquer les fichiers sensibles ---
    @blocked path /.env /.git/* /docker-compose* /Dockerfile* /prisma/* /.next/*
    respond @blocked 404

    # --- Reverse Proxy ---
    reverse_proxy portfolio-web:3000 {
        # Health check côté Caddy
        health_uri /api/health
        health_interval 30s
        health_timeout 5s

        # Headers proxy
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }

    # --- Logs ---
    log {
        output file /var/log/caddy/yann-dev.access.log {
            roll_size 10mb
            roll_keep 5
        }
    }
}

# Rediriger www vers non-www
www.yann-dev.fr {
    redir https://yann-dev.fr{uri} permanent
}
```

> **Note** : Le rate limiting nécessite le module `caddy-ratelimit`. Si tu utilises l'image Caddy officielle sans ce module, retire les blocs `rate_limit` et utilise plutôt fail2ban côté VPS.

### Docker Compose Caddy

```yaml
services:
  caddy:
    image: caddy:2-alpine
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
      - caddy_logs:/var/log/caddy
    networks:
      - caddy-net
    deploy:
      resources:
        limits:
          memory: 128M
    logging:
      driver: json-file
      options:
        max-size: "5m"
        max-file: "3"

volumes:
  caddy_data:
  caddy_config:
  caddy_logs:

networks:
  caddy-net:
    external: true
```

## Secrets GitHub Actions

Aller dans **Settings > Secrets and variables > Actions** du repo.

| Secret | Description | Exemple |
|--------|-------------|---------|
| `VPS_HOST` | IP ou domaine du VPS | `123.45.67.89` |
| `VPS_USERNAME` | Utilisateur SSH | `deploy` |
| `VPS_SSH_KEY` | Clé privée SSH (contenu complet) | `-----BEGIN OPENSSH...` |
| `VPS_PORT` | Port SSH | `22` |
| `GHCR_TOKEN` | GitHub PAT avec scope `read:packages` | `ghp_xxxx` |
| `ENV` | Contenu complet du fichier `.env` prod | Voir section ci-dessous |

## Fichier .env de production

Le secret `ENV` doit contenir l'intégralité du `.env` de production :

```env
# --- PostgreSQL ---
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=<mot_de_passe_fort>
POSTGRES_DB=portfolio
POSTGRES_PORT=5432

# --- Database URL ---
DATABASE_URL=postgresql://portfolio_user:<mot_de_passe_fort>@portfolio-postgres:5432/portfolio

# --- Auth ---
BETTER_AUTH_SECRET=<secret_aleatoire_64_chars>
BETTER_AUTH_URL=https://yann-dev.fr

# --- Admin ---
ADMIN_EMAIL=admin@yann-dev.fr
ADMIN_PASSWORD=<mot_de_passe_admin_fort>

# --- App ---
NEXT_PUBLIC_APP_URL=https://yann-dev.fr
```

> **Important** : Dans `DATABASE_URL`, le host est `portfolio-postgres` (nom du container Docker, pas `localhost`).

### Générer des secrets forts

```bash
# BETTER_AUTH_SECRET
openssl rand -base64 48

# POSTGRES_PASSWORD
openssl rand -base64 32
```

## Déploiement

### Automatique (CI/CD)

Chaque push sur `main` déclenche le pipeline :

1. **Build** : construit 2 images Docker (app + migrate) et les pousse sur GHCR
2. **Deploy** : copie le compose sur le VPS, écrit le `.env`, pull les images et relance les containers

### Manuel depuis GitHub

Aller dans **Actions > Deploy Portfolio to VPS > Run workflow**.

### Manuel sur le VPS

```bash
cd /var/html/portfolio
docker compose pull
docker compose up -d
```

## Vérification post-déploiement

```bash
# Status des containers
docker compose ps

# Logs de l'app
docker compose logs -f web

# Logs des migrations
docker compose logs migrate

# Healthcheck
curl https://yann-dev.fr/api/health
```

## Structure des fichiers sur le VPS

```
/var/html/portfolio/
├── docker-compose.yml    # Copié depuis docker-compose.prod.yml par la CI
└── .env                  # Créé depuis le secret ENV par la CI
```

## Rollback

```bash
cd /var/html/portfolio

# Revenir à un SHA spécifique
docker compose pull ghcr.io/slayercode1/portfolio:<sha_commit>
# Modifier l'image dans docker-compose.yml puis :
docker compose up -d
```

## Backup PostgreSQL

```bash
# Dump manuel
docker exec portfolio-postgres pg_dump -U portfolio_user portfolio > backup_$(date +%Y%m%d).sql

# Restore
cat backup.sql | docker exec -i portfolio-postgres psql -U portfolio_user portfolio
```
