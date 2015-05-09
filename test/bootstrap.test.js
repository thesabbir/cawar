var Sails = require('sails');
var Barrels = require('barrels');
var should = require('should');

before(function (done) {

  Sails.lift({
    log: {
      level: 'error'
    },
    models: {
      connection: 'localDiskDb',
      migrate: 'drop'
    },
    environment: 'development',
    port: 9999,
    hooks: {
      "grunt": false,
      "session": false,
      "i18n": false,
      "csrf": false,
      "views": false,
      "pubsub": false
    }
  }, function (err, sails) {
    if (err) {
      return done(err);
    }
    var barrels = new Barrels();
    fixtures = barrels.data;

    barrels.populate(function (err) {
      done(err, sails);
    });
  });
});


after(function (done) {
  console.log();
  Sails.lower(done);
});

