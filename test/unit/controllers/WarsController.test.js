var request = require('supertest');

describe.skip('WarsController', function () {
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

    it('bases should be equal to total_bases', function (done) {
      request(sails.hooks.http.app)
        .get('/wars')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          res.body[0].warBases.length.should.be.eql(parseInt(res.body[0].total_bases));
          done();
        });

    });
  });

  describe('POST /wars', function () {

    // Get the token before the test
    var token;
    var supremeToken;

    before(function (done) {
      async.parallel({
          token: function (next) {
            request(sails.hooks.http.app)
              .post('/auth')
              .send(fixtures['users'][1])
              .expect(200)
              .end(function (err, res) {
                next(err, res.body.token);
              });
          },
          supremeToken: function (next) {
            request(sails.hooks.http.app)
              .post('/auth')
              .send(fixtures['users'][0])
              .expect(200)
              .end(function (err, res) {
                next(err, res.body.token);
              });
          }

        }
        , function callback(err, result) {
          token = result.token;
          supremeToken = result.supremeToken;
          done(err);
        });

    });

    it('should give a 401 with no Authorization header', function (done) {
      request(sails.hooks.http.app)
        .post('/wars')
        .send(fixtures['wars'][0])
        .expect(401, done);
    });

    it('should create a war if has Authorization and Admin Permission', function (done) {
      request(sails.hooks.http.app)
        .post('/wars')
        .set({"Authorization": "Bearer " + supremeToken})
        .send(fixtures['wars'][0])
        .expect(200)
        .end(function (err, res) {
          done();
        });
    });

    it('should get 403 if not admin', function (done) {
      request(sails.hooks.http.app)
        .post('/wars')
        .set({"Authorization": "Bearer " + token})
        .send(fixtures['wars'][0])
        .expect(403, done);
    });

  });
});
