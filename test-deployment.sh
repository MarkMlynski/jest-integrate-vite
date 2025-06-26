#!/bin/bash
echo "Testing deployment configuration..."

# Test basic server startup
timeout 10s node index.js &
SERVER_PID=$!
sleep 3

# Test health endpoints
echo "Testing endpoints:"
curl -s -o /dev/null -w "Health endpoint: %{http_code}\n" http://localhost:5000/health
curl -s -o /dev/null -w "Root endpoint: %{http_code}\n" http://localhost:5000/
curl -s -o /dev/null -w "Healthz endpoint: %{http_code}\n" http://localhost:5000/healthz

# Cleanup
kill $SERVER_PID 2>/dev/null
echo "Deployment test complete"