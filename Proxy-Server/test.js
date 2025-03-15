import express from 'express';
import httpProxy from 'http-proxy';

// Create an Express app
const app = express();

// Create a proxy server
const proxy = httpProxy.createProxyServer();

// Define the backend servers
const backendServers = [
  { target: 'http://localhost:3001' }, // Backend Server 1
  { target: 'http://localhost:3002' }, // Backend Server 2
];

// Middleware to handle requests
app.use((req, res) => {
  // Simple round-robin load balancing
  const backend = backendServers.shift(); // Get the first backend server
  if (backend) {
    console.log(`Proxying request to: ${backend.target}`);
    proxy.web(req, res, backend);
    backendServers.push(backend); // Move it to the end of the list
  } else {
    res.status(500).send('No backend servers available');
  }
});

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.status(500).send('Proxy error');
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Reverse proxy running on http://localhost:${PORT}`);
});