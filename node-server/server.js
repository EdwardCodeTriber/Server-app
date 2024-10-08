// Import the http module
const http = require("http");

// Define the port to listen on
const PORT = 3000;

// Create a server
const server = http.createServer((req, res) => {
  // Set the response
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.writeHead(200, { "Content-Type": "text/plain" });

  // Send a response message
  // what will be displyed
  // res.end("Hello, World!\n This is a server running on this port");

  ///////////////// Task 2 Code ///////////////////////
  // Default routing on server runtime
  if (req.url === "/" && req.method === "GET") {
    // Set the response

    res.writeHead(200);
    // Send a response message
    // what will be displyed on port http://localhost:3000/data
    res.end(
      JSON.stringify({
        message: "Welcome to Default Server! on runtime http://localhost:3000/",
      })
    );
  } else if (req.url === "/data" && req.method === "GET") {
    // Send a response message
    // what will be displyed
    res.writeHead(200);
    res.end(
      JSON.stringify({
        data: "Data Displayed on the http://localhost:3000/data routing.",
      })
    );
  } else if (req.url === "/node" && req.method === "GET") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        data: "Written on node as a GET route data http://localhost:3000/node",
      })
    );
  } else if (req.url === "/submit" && req.method === "POST") {
    let body = "";

    // Collect the incoming data
    req.on("data", (chunk) => {
      // Convert Buffer to string
      body += chunk.toString();
    });

    // When all data is received
    req.on("end", () => {
      // Try to parse the body as JSON
      try {
        const parsedData = JSON.parse(body);

        // Respond with the parsed data
        res.writeHead(200);
        res.end(
          JSON.stringify({
            message: "Data received successfully!",
            receivedData: parsedData,
          })
        );
      } catch (error) {
        // Handle invalid JSON
        res.writeHead(400);
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
      // pass info to the submit url
      // curl -X POST http://localhost:3000/submit -H "Content-Type: application/json" -d '{"name": "Edward", "age":"44"}'
    });
  } else {
    // Handle invalid routes
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found or available" }));
  }
});

// listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
