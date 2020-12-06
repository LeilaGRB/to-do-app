//import http module
const http = require("http");

// imprte app module
const app = require("./app");

// past 'app' to creat server
const server = http.createServer(app);

const port = process.env.PORT || 2929;
//launch the server to the listened
server.listen(port);