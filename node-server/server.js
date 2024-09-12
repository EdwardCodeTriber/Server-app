// Import the http module
const http = require('http');

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Create a server
const server = http.createServer((res) => {
  // Set the response 
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Send a response message
  // what will be displyed
  res.end('Hello, World!\n');
});

// listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
