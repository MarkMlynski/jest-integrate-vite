const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting Express server...');

// Basic middleware
app.use(express.json());

// Serve static files
const staticPath = path.join(__dirname, 'jest-integrate-vite', 'dist');
console.log('Static path:', staticPath, 'exists:', fs.existsSync(staticPath));

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
}

// Health check
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  console.log('Root endpoint requested');
  const indexPath = path.join(staticPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    console.log('Serving React app');
    res.sendFile(indexPath);
  } else {
    console.log('React app not found, serving JSON response');
    res.status(200).json({
      message: 'Server is running',
      status: 'ok',
      timestamp: new Date().toISOString(),
      port: PORT
    });
  }
});

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started successfully on port ${PORT}`);
  console.log(`Server address: ${server.address().address}:${server.address().port}`);
  console.log('Server is ready to accept connections');
});

// Error handling
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

// Keep the process alive
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;