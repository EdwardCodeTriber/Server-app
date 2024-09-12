// Import the http module
const http = require("http");

// Define the port to listen on
const PORT = 3000;

// Create a server
const server = http.createServer((req, res) => {
  // Set the response
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send a response message
  // what will be displyed
  res.end("Hello, World!\n This is a server running on this port");
});

// listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
