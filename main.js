const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Immediate server startup without dependencies
app.get('/health', (req, res) => res.status(200).json({status: 'healthy'}));
app.get('/healthz', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => res.status(200).json({message: 'App running', port: PORT}));

app.listen(PORT, '0.0.0.0', () => console.log(`App listening on port ${PORT}`));