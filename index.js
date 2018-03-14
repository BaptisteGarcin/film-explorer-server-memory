const http = require('http');
const fs = require('fs');
const path = require('path');

const { movies, app } = require('./app');

fs.readFile(path.join(__dirname, 'movies.json'), (err, contents) => {
  const data = JSON.parse(contents);
  data.forEach((movie) => {
    movies[movie.id] = movie;
  });

  const server = http.createServer(app).listen(process.env.PORT || 5042);
  console.log('Listening on port %d', server.address().port);
});
