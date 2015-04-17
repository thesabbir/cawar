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
    port : 9999
  }, function (err) {
    if (err) {
      return done(err);
    }
    var barrels = new Barrels();
    fixtures = barrels.data;

    barrels.populate(function (err) {
      done(err, sails);
    });
  })
});



after(function (done) {
  console.log();
  Sails.lower(done);
});

