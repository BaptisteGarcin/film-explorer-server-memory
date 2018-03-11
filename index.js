const http = require('http');
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
}).listen(5042);
console.log( 'Listening on port %d', server.address().port );
