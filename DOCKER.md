# Docker Setup - Portfolio Next.js

Ce guide explique comment lancer l'application avec Docker et PostgreSQL.

## Prérequis

- Docker et Docker Compose installés
- Port 3000 et 5434 disponibles

## Configuration

### Variables d'environnement

Les variables d'environnement sont définies dans le fichier `.env` à la racine du projet.

Pour la production, copiez `.env.docker` vers `.env` et modifiez les valeurs sensibles :

```bash
cp .env.docker .env
```

**Variables importantes à modifier en production** :

- `BETTER_AUTH_SECRET` : Générez une chaîne aléatoire sécurisée
- `ADMIN_EMAIL` : Email de l'administrateur
- `ADMIN_PASSWORD` : Mot de passe de l'administrateur (minimum 8 caractères)
- `POSTGRES_PASSWORD` : Mot de passe PostgreSQL

### Identifiants admin par défaut

- **Email**: `admin@portfolio.com`
- **Password**: `Admin123!`

⚠️ **Important**: Changez ces identifiants en production !

Pour utiliser des identifiants personnalisés, définissez les variables d'environnement:

```bash
export ADMIN_EMAIL="votre-email@example.com"
export ADMIN_PASSWORD="VotreMotDePasse123!"
```

## Lancement

### Production (Docker Compose)

```bash
# Construire et démarrer les services
docker-compose up -d --build

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ supprime la base de données)
docker-compose down -v
```

L'application sera accessible sur http://localhost:3000

### Accès à la base de données

PostgreSQL est accessible sur:
- **Host**: localhost
- **Port**: 5434
- **Database**: portfolio
- **User**: postgres
- **Password**: postgres

Connexion avec Prisma Studio:
```bash
docker exec -it portfolio-web npx prisma studio
```

## Création manuelle d'un utilisateur admin

Si vous devez créer un utilisateur admin après le déploiement:

### Option 1: Via script dans le container

```bash
docker exec -it portfolio-web node /app/scripts/create-admin.js
```

### Option 2: Via le script curl

```bash
./scripts/create-admin-curl.sh
```

### Option 3: Via variables d'environnement personnalisées

```bash
docker exec -it -e ADMIN_EMAIL="nouveau@email.com" -e ADMIN_PASSWORD="NouveauPass123!" portfolio-web node /app/scripts/create-admin.js
```

## Migrations de base de données

Les migrations Prisma sont automatiquement exécutées au démarrage du container.

Pour exécuter manuellement:

```bash
# Push schema changes
docker exec -it portfolio-web npx prisma db push

# Generate Prisma client
docker exec -it portfolio-web npx prisma generate

# Seed database
docker exec -it portfolio-web npx prisma db seed
```

## Développement avec Docker

Pour le développement avec hot-reload, utilisez le docker-compose de dev:

```bash
docker-compose -f docker-compose.dev.yml up
```

## Résolution de problèmes

### Le container web ne démarre pas

Vérifiez les logs:
```bash
docker-compose logs web
```

### Problème de connexion à la base de données

Vérifiez que PostgreSQL est bien démarré:
```bash
docker-compose ps
docker-compose logs postgres
```

### Reset complet

Pour tout réinitialiser:
```bash
# Arrêter et supprimer tout
docker-compose down -v

# Supprimer les images
docker rmi portfolio-web

# Rebuild from scratch
docker-compose up -d --build
```

## Structure Docker

### Services

- **postgres**: Base de données PostgreSQL 16
- **web**: Application Next.js 16

### Volumes

- `postgres_data`: Données PostgreSQL persistantes

### Réseau

- `portfolio-network`: Réseau bridge pour la communication entre services

## Production

Pour le déploiement en production:

1. Changez les mots de passe dans `.env.docker`
2. Modifiez `BETTER_AUTH_SECRET` avec une valeur aléatoire sécurisée
3. Utilisez un service de base de données externe plutôt que le container PostgreSQL
4. Configurez un reverse proxy (nginx, traefik) devant Next.js
5. Activez HTTPS

## Commandes utiles

```bash
# Accès au shell du container web
docker exec -it portfolio-web sh

# Accès au shell PostgreSQL
docker exec -it portfolio-postgres psql -U postgres -d portfolio

# Voir les logs en temps réel
docker-compose logs -f web

# Redémarrer un service
docker-compose restart web

# Rebuild sans cache
docker-compose build --no-cache
```
