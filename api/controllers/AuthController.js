/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
      return res.json(401, {err: 'username and password required'});
    }

    Users.findOne({username: username}, function (err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid username or password'});
      }

      Users.validPassword(password, user, function (err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid username or password'});
        } else {
          res.json({
            user: user,
            token: sailsTokenAuth.issueToken({ uid : user.id})
          });
        }
      });
    })
  }
};

