const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Health endpoints - exactly as specified in deployment guide
app.get('/health', (req, res) => res.sendStatus(200));
app.get('/health-check', (req, res) => res.sendStatus(200));
app.get('/ping', (req, res) => res.send('pong'));

// Serve React build
const distPath = path.join(__dirname, 'jest-integrate-vite/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Root endpoint returns 200 for platform health checks
app.get('/', (req, res) => {
  const indexFile = path.join(distPath, 'index.html');
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.sendStatus(200);
  }
});

// API endpoint
app.get('/api/status', (req, res) => {
  res.status(200).json({ api: 'available' });
});

// Start server - critical: bind to 0.0.0.0 and log startup
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

module.exports = app;
