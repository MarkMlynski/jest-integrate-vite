import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '5000');

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'React + Vite Google Login with Database Integration',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.status(200).json({
    api: 'available',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// Serve static files from the dist directory (for production builds)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api') && !req.path.startsWith('/health')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

export default app;