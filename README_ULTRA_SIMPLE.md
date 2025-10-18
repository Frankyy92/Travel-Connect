# Travel-Connect — Ultra Simple

Déjà prêt pour Render. Rien à configurer.

## Ce qu'il y a
- `render.yaml` (déploiement auto Render)
- `server.cjs` (serveur Express prêt; écoute 0.0.0.0 et PORT Render)
- `public/index.html` (page d'accueil)
- `/api/ping` (route API de test)
- `/healthz` (healthcheck Render)

## Comment mettre en ligne (3 gestes)
1. Crée un dépôt vide sur GitHub (nom: Travel-Connect)
2. Upload **tous les fichiers** de ce dossier dans le dépôt
3. Sur https://dashboard.render.com → New → Web Service → Connecte GitHub → choisis ton repo → Create

C'est tout.
