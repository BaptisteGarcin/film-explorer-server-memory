const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

module.exports = {
  movies,
  app,
};
