// Alternative entry point for deployment systems that might not recognize index.js
const app = require('./index.js');

// This file ensures the server starts even if deployment systems
// have issues with the main index.js file
console.log('Alternative start script loaded');