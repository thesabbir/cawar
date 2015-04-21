/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    //TODO: Do some validation on the input
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match'});
    }

    if (req.body.rank === "supreme-leader") {
    return res.json(403, {err: 'There is one and only supreme leader in this land.'})
    }

    Users.create(req.body).exec(function (err, user) {
      if (err) {
        res.json(err.status, {err: err});
        return;
      }
      if (user) {
        res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
      }
    });
  }
};
