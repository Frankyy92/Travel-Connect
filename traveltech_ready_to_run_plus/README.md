
# TravelTech – Guide Culturel Intelligent (MVP prêt à l'emploi)

Ce dépôt contient une **application mobile Expo (React Native)** et un **backend NestJS** avec **Prisma + PostgreSQL**, livrés avec un `docker-compose.yml` pour lancer l'API et la base de données rapidement.

## Aperçu
- **mobile/** : Application Expo (iOS/Android) – carte, POI proches, parcours simple, quêtes, AR légère (boussole + flèches directionnelles), badges.
- **backend/** : API NestJS (TypeScript) – endpoints `poi/nearby`, `poi/:id`, `itinerary/plan`, `quest/validate`, `profile/*`. Prisma + Postgres, seed de POI pour Paris et Barcelone.
- **docker-compose.yml** : Postgres + backend prêts à démarrer.
- **.env.example** : modèles d'environnements.

## Démarrage rapide

### 1) Backend + DB
```bash
cp backend/.env.example backend/.env
docker compose up --build
# L'API NestJS démarre sur http://localhost:4000 (Swagger: /docs)
```

### 2) Mobile (Expo)
```bash
cd mobile
cp .env.example .env
npm install
npm run start
# Ouvrir dans l'app Expo Go (iOS/Android) ou émulateur.
```

> Le mobile s'attend à trouver l'API à `http://localhost:4000`. Si vous testez sur un appareil physique, mettez l'IP de votre machine dans `MOBILE_API_BASE_URL` du fichier `.env` mobile.

## Déploiement

- **Backend** : construire l'image via `backend/Dockerfile` et pousser sur Render / Railway / Fly.io / Cloud Run. N'oubliez pas d'exécuter `npx prisma db push` et `npx prisma db seed`.
- **Mobile** : build via Expo EAS (`eas build -p ios -p android`). Renseigner `MOBILE_API_BASE_URL` en prod (par exemple une URL Render).

## Authentification (MVP)
Anonyme par **User-Id** (UUID) stocké en local (AsyncStorage). À terme : OAuth 2.0.

## Données
Un **seed** de POI/Quêtes (Paris & Barcelone) est inclus pour tester immédiatement.

## Licences
OpenStreetMap/Wikidata pour données (exemples). Code: MIT.


---

## Tests et préprod avec **GitHub**

- **Repo GitHub** : pousse ce dossier dans un dépôt privé ou public.
- **GitHub Actions (CI)** : ajoute un workflow Node pour builder l'API et lancer `prisma generate`. (Exemple minimal ci-dessous.)
- **Preview backend** : connecte Render/Railway à ton repo → déploiements automatiques par branche/PR (environnements de prévisualisation).
- **Codespaces** : tu peux lancer `docker compose up` et avoir l'API accessible via ports exposés.
- **Mobile** : pour tester sans publier, utilise **Expo** (QR code) ou fais des **builds internes** via **EAS** (TestFlight/track interne).

### Exemple de workflow CI minimal (`.github/workflows/ci.yml`)
```yaml
name: CI
on: [push, pull_request]
jobs:
  api:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx prisma generate
      - run: npm run build
```

> Pour des **builds Expo EAS** via Actions, ajoute `eas build` et configure les secrets `EXPO_TOKEN`.
