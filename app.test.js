const request = require('supertest');
const { app, movies } = require('./app');

describe('Film Explorer API', () => {
  beforeEach(() => {
    movies[135397] = {
      id: 135397,
      overview: 'Twenty-two years after ...',
      release_date: '2015-06-12',
      poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
      title: 'Jurassic World',
      vote_average: 6.9,
    };
  });

  // The supertest request().method() chain returns a Promise. If the body of
  // a Jest test returns a Promise, the test will fail if the Promise rejects.
  // Thus we make sure to return the chain in each test.

  /* eslint-disable arrow-body-style */
  test('GET /api/movies should return all movies (mostly Jest)', () => {
    // Here we use the built-in Jest matchers, like we used with React, et al.
    return request(app).get('/api/movies').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body).toEqual(Object.values(movies));
    });
  });

  // SuperTest has several helpful methods for conveniently testing responses
  // that we can use to make the tests more concises
  test('GET /api/movies should return all movies (mostly SuperTest)', () => {
    return request(app).get('/api/movies')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(Object.values(movies));
  });

  test('PUT /api/movies/:id should update the movie (mostly SuperTest)', () => {
    const newMovie = Object.assign({}, movies[135397], { rating: 4 });
    return request(app).put('/api/movies/135397').send(newMovie)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(newMovie);
  });

  // TODO: Add a test for GET /api/movies/:id
});
