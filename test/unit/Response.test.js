var request = require('supertest');

describe('Response', function () {

  describe('GET /random-route', function () {

    it('should respond with 404 not found', function (done) {
      request(sails.hooks.http.app)
        .get('/random-route')
        .expect(404, done);
    });
  });

});
