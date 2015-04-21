module.exports = function (req, res, next) {

  Users.findOne(req.token)
    .exec(function exec(error, user) {
      if (error) {
        next(error);
      } else if (!user) {

        next(error);
        return res.json(401, {err: 'User not found - Please login.'});

      } else if (user.rank == 'supreme-leader') {
        next();
      } else {
        return res.json(403, {err: 'Stay away! You are not supreme leader!'});
      }
    })
};
