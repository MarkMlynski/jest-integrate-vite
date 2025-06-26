const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Minimal middleware for deployment
app.use(express.json());
app.use(express.static(path.join(__dirname, 'jest-integrate-vite/dist')));

// Essential health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Root route
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'jest-integrate-vite/dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Server is running');
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = app;