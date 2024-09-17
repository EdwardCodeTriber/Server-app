const http = require("http")
// imported url to pass data into it
const url = require("url");

// Define the port
const PORT = process.env.PORT || 3001;

// Create the server
const server = http.createServer((req, res) => {
  // Set the default response headers
  res.setHeader("Content-Type", "application/json");

  // Root route (GET)
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Welcome to Default Server! on runtime http://localhost:3001/" }));

    // Handle POST request to /submit
  } else if (req.url === "/submit" && req.method === "POST") {

    let body = "";

    // Collect the incoming data
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // When all data is received
    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body);

        // Extract name and age in the body
        const name = parsedData.name;
        const age = parsedData.age;

        // Redirect to /display route with query parameters
        res.writeHead(302, {
          Location: `/display?name=${encodeURIComponent(
            name
          )}&age=${encodeURIComponent(age)}`,
        });
        res.end();
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
    });

    //    curl -X POST http://localhost:3001/submit -H "Content-Type: application/json" -d '{"name":"Edward", "age":30}'

    // Display route (GET)
  } else if (req.url.startsWith("/display") && req.method === "GET") {
    // Parse the query parameters
    const queryObject = url.parse(req.url, true).query;

    // Extract data from the query string
    const name = queryObject.name;
    const age = queryObject.age;

    // Display the data
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>Name: ${name}</h1><h2>Age: ${age}</h2>`);

    // Handle unrecognized routes
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
