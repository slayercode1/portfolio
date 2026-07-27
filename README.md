# Portfolio — Yann Clain

Portfolio personnel : [yann-dev.fr](https://yann-dev.fr)

Site **100 % statique** — aucune base de données. Tout le contenu (textes,
projets, réseaux sociaux, stack technique) vit dans un seul fichier :
[`content/site.json`](content/site.json).

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, output standalone)
- [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- Design system « Barely There » : interface minimale, typographie d'abord

## Développement

```bash
npm install
npm run dev
```

Le site est accessible sur http://localhost:3000.

## Mettre à jour le contenu

Éditez `content/site.json` :

| Clé            | Contenu                                      |
| -------------- | -------------------------------------------- |
| `fr`           | Textes des sections (hero, à propos et contact) |
| `projects`     | Liste des projets (titre, description, image, technos, lien) |
| `technologies` | Stack technique affichée dans « À propos »   |
| `socials`      | Liens réseaux sociaux (footer + contact)     |

Les images des projets vont dans `public/images/projects/`.

## Build & déploiement

```bash
npm run build   # build de production
npm run lint    # lint
```

Le déploiement est automatisé : chaque push sur `main` construit l'image Docker,
la publie sur GHCR puis la déploie sur le VPS (voir
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

Pour tester l'image de production en local :

```bash
docker build -t portfolio .
docker run --rm -p 3000:3000 portfolio
```
