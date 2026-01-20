const http = require("http");
const httpProxy = require("http-proxy");


// Create a proxy server
const proxy = httpProxy.createProxyServer({});


// Change the target to any safe test website you control.
// "example.com" is used here since it's a public, non-dangerous test domain.
const TARGET = "http://example.com";


// Create the HTTP server
const server = http.createServer((req, res) => {
  console.log("Proxying request:", req.method, req.url);


  proxy.web(req, res, { target: TARGET }, (err) => {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Educational proxy error: " + err.message);
  });
});


// Bind to localhost (127.0.0.1) only, so it’s not accessible by anyone else
const PORT = 8080;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`✅ Educational proxy running at http://127.0.0.1:${PORT}`);
  console.log(`Forwarding requests to: ${TARGET}`);
});


