#!/usr/bin/env node

const http = require('http');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  if (req.url === '/health' || req.url === '/health-check') {
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
  } else if (req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('pong');
  } else if (req.url === '/') {
    res.end(JSON.stringify({ 
      message: 'Test server running', 
      status: 'ok',
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on 0.0.0.0:${PORT}`);
  console.log(`Health: http://0.0.0.0:${PORT}/health`);
  console.log(`Root: http://0.0.0.0:${PORT}/`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});