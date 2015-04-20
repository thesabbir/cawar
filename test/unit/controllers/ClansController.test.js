var request = require('supertest');

describe('ClansController', function () {
  describe('GET /clans', function () {
    it('should response json with rc 200', function (done) {
      request(sails.hooks.http.app)
        .get('/clans')
        .expect(200)
        .end(function (err, res) {
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });
});
