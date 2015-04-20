describe('Clans', function () {
  it('should not be empty', function (done) {
    Clans.find().exec(function (err, clans) {
      clans.length.should.not.be.eql(0);
      done();
    })
  });
});
