module.exports = function (req, res, next) {

  Users.findOne(req.token)
    .exec(function exec(error, user) {
      if (error) {
        next(error);
      } else if (!user) {
        error = new Error();

        error.status = 401;
        error.message = 'User not found - Please login.';

        next(error);
      } else if (user.rank == 'supreme-leader') {
        next();
      } else {
        error = new Error();

        error.status = 403;
        error.message = 'Forbidden - You are not the supreme leader.';

        next(error);
      }
    })
};
