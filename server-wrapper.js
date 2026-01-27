/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();
const http = require("http");
// Parse timeout configurations from environment variables
let serverTimeout = Number.parseInt(process.env.SERVER_TIMEOUT, 10);
let headersTimeout = Number.parseInt(process.env.HEADERS_TIMEOUT, 10);
let requestTimeout = Number.parseInt(process.env.REQUEST_TIMEOUT, 10);

// Validate and set defaults
if (Number.isNaN(serverTimeout) || !Number.isFinite(serverTimeout) || serverTimeout < 0) {
  serverTimeout = 10_000; // 10 seconds default (protects against slow read attacks)
}

if (Number.isNaN(headersTimeout) || !Number.isFinite(headersTimeout) || headersTimeout < 0) {
  headersTimeout = 20_000; // 20 seconds default (should be > keepAliveTimeout)
}

if (Number.isNaN(requestTimeout) || !Number.isFinite(requestTimeout) || requestTimeout < 0) {
  requestTimeout = 60_000; // 1 minutes default (entire request/response cycle)
}

// Patch http.Server to apply timeouts when Next.js creates the server
const originalCreateServer = http.createServer;
http.createServer = function(...args) {
  const server = originalCreateServer.apply(this, args);
  
  // Apply timeout configurations
  server.timeout = serverTimeout;
  server.requestTimeout = requestTimeout;
  server.headersTimeout = headersTimeout;
  
  console.log("✓ HTTP Server timeout configuration applied:");
  console.log(`  - timeout: ${serverTimeout}ms (protects against slow read/write)`);
  console.log(`  - requestTimeout: ${requestTimeout}ms (entire request/response cycle)`);
  console.log(`  - headersTimeout: ${headersTimeout}ms (time to receive headers)`);
  
  return server;
};

// Now load and run the Next.js standalone server
require("./server.js");
