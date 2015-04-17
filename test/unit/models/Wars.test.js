describe('Wars', function() {
  it ('should not be empty', function(done) {
    Wars.find().exec(function(err, wars) {
      wars.length.should.be.eql(fixtures['wars'].length);
      done();
    });
  });

});
