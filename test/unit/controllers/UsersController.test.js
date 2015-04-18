var request = require('supertest');

describe('UsersController', function () {
  describe('GET /users', function () {

    it('should respond with json with rc 200', function (done) {
      request(sails.hooks.http.app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should have a property name username', function (done) {
      request(sails.hooks.http.app)
        .get('/users')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          res.body[0].should.have.property('username').and.be.instanceof(String);
          done();
        });

    });
  });
});
