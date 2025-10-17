import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servez les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Healthcheck (Render)
app.get(['/health', '/healthz'], (_req, res) => res.status(200).send('OK'));

// Route racine
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Travel-Connect en ligne sur http://${HOST}:${PORT}`);
});
