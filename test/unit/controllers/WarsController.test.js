var request = require('supertest');

describe('WarsController', function () {
  describe('GET /wars', function () {

    it('should respond with json with rc 200', function (done) {
      request(sails.hooks.http.app)
        .get('/wars')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should have a property name opponent', function (done) {
      request(sails.hooks.http.app)
        .get('/wars')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          res.body[0].should.have.property('opponent').and.be.instanceof(String);
          done();
        });

    });
  });

  describe('POST /wars', function () {
    it('should give a 401 with no Authorization header', function (done) {
      request(sails.hooks.http.app)
        .post('/wars')
        .send(fixtures['wars'][0])
        .expect(401, done);
    });

  });
});
