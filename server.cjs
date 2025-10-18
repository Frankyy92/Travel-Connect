const express = require('express');
const path = require('path');

const app = express();

// Statique
app.use(express.static(path.join(__dirname, 'public')));

// Healthcheck
app.get(['/health', '/healthz'], (_req, res) => res.status(200).send('OK'));

// Racine
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log('Travel-Connect CJS en ligne sur ' + HOST + ':' + PORT);
});
