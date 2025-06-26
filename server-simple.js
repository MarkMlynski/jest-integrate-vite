const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Set headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Health endpoints
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (req, res) => {
  const distPath = path.join(__dirname, 'jest-integrate-vite/dist/index.html');
  if (fs.existsSync(distPath)) {
    res.sendFile(distPath);
  } else {
    res.status(200).json({ 
      message: 'Server running',
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  }
});

// Static files
const staticPath = path.join(__dirname, 'jest-integrate-vite/dist');
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;