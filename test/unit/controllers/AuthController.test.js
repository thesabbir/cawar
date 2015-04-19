var request = require('supertest');

describe('AuthController', function () {
  describe('POST /auth', function () {
    it('it should login user and response with a token', function (done) {
      request(sails.hooks.http.app)
        .post('/auth')
        .send(fixtures['users'][0])
        .expect(200)
        .end(function (err, res) {

          res.body.should.have.property('token');
          done();
        });

    });
    it('it should response with a 401 when credentials invalid', function (done) {
      request(sails.hooks.http.app)
        .post('/auth')
        .send({ username : "invalid", password : "invalid"})
        .expect(401)
        .end(function (err, res) {
          res.body.should.not.have.property('token');
          done();
        });

    });
  });
});
