const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const corsOptions = {
  methods: ['GET', 'PUT', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const movies = {};

app.get('/api/movies', (request, response) => {
  response.send(Object.values(movies));
});

app.get('/api/movies/:id', (request, response) => {
  response.send(movies[request.params.id]);
});

app.put('/api/movies/:id', (request, response) => {
  movies[request.params.id] = request.body;
  response.send(request.body);
});

fs.readFile(path.join(__dirname, 'movies.json'), (err, contents) => {
  const data = JSON.parse(contents);
  data.forEach((movie) => {
    movies[movie.id] = movie;
  });

  const server = http.createServer(app).listen(process.env.PORT || 5042);
  console.log('Listening on port %d', server.address().port);
});
