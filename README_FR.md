# Travel‑Connect — Starter Render (Node/Express)

Ce dépôt est prêt à être **uploadé sur GitHub** puis **déployé sur Render** en 2 minutes.

## 📦 Contenu
- `render.yaml` — Provisioning auto sur Render (type web, build/start, variables d'env, healthcheck).
- `server.js` — Serveur Express qui écoute `0.0.0.0` et le port Render (`process.env.PORT`).
- `public/index.html` — Page d'accueil modifiable.
- `.gitignore` — Ignore `node_modules`, etc.
- `package.json` — Scripts et dépendances.

---

## 1) Mettre sur GitHub (upload)
**Option A — via interface GitHub (drag & drop)**
1. Crée un repo vide **Travel-Connect** sur GitHub.
2. Téléverse tous les fichiers de ce dossier (y compris `render.yaml`).

**Option B — via commandes Git**
```bash
git init
git add .
git commit -m "Starter Render Travel-Connect"
git branch -M main
git remote add origin https://github.com/<ton_compte>/Travel-Connect.git
git push -u origin main
```

---

## 2) Déployer sur Render
1. Va sur **https://dashboard.render.com/**
2. **New +** → **Web Service**
3. Connecte ton **GitHub** et choisis le repo **Travel-Connect**
4. Render détecte `render.yaml` automatiquement. Vérifie :
   - Type : **Web Service**
   - Runtime : **Node**
   - Build Command : `npm install`
   - Start Command : `npm start`
   - Health Check Path : `/healthz`
   - Vars d'env : `TZ=Europe/Paris`, `SESSION_SECRET` auto-généré
   - Plan : **Free** (tu pourras changer plus tard)
5. Clique **Create Web Service** → le build démarre puis l'app est en ligne.

---

## 3) Mettre à jour le site
- Modifie `public/index.html` ou ton backend dans `server.js`
- `git add . && git commit -m "Update" && git push`
- Render re-déploie automatiquement à chaque push.

---

## 4) Personnalisation rapide
- **Routes API** : ajoute tes endpoints Express dans `server.js` (ex: `/api/hello`).
- **Static/Front** : remplace `public/` par le build d'un framework (React/Vite → mets la sortie dans `public/` ou adapte Express).
- **Base de données** : sur Render, ajoute un **PostgreSQL** et une variable d'env `DATABASE_URL`. Pense aux migrations.

---

## 5) Dépannage (FAQ)
- **Port déjà utilisé / serveur ne démarre pas** : assure-toi que `server.js` utilise `process.env.PORT` et `0.0.0.0`.
- **Build long ou en échec** : vérifie `package.json`, versions Node (>=18), et le log Render (onglet "Events").
- **404 sur `/healthz`** : la route est incluse; garde-la telle quelle pour le healthcheck Render.
