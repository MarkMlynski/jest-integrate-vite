const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(__dirname + '/jest-integrate-vite/dist'));

app.get('/health', (req, res) => res.status(200).json({status: 'ok'}));
app.get('/healthz', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/jest-integrate-vite/dist/index.html', (err) => {
    if (err) res.status(200).json({status: 'ok', message: 'Server running'});
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});