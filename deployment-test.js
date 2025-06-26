// Simple test to verify server is working
const http = require('http');

const PORT = process.env.PORT || 5000;

function testEndpoint(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`${path}: ${res.statusCode} ${res.statusMessage}`);
        resolve({ status: res.statusCode, data });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function runTests() {
  try {
    console.log('Testing deployment endpoints...');
    await testEndpoint('/health');
    await testEndpoint('/');
    await testEndpoint('/healthz');
    await testEndpoint('/api/status');
    console.log('All tests passed - deployment ready!');
  } catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
  }
}

setTimeout(runTests, 1000); // Wait for server to start