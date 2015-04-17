describe('Bases', function() {
  it ('should not be empty', function(done) {
    Bases.find().exec(function(err, bases) {
      bases.length.should.not.be.eql(0);
      done();
    });
  });

});
