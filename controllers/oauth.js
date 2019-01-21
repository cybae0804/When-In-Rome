const passport = require('../config/passport-setup');

exports.login = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.redirect = passport.authenticate('google', {
  failureRedirect: '/oauth/loginFailure',
  successRedirect: '/dashboard',
  session: true,
});

exports.getUser = (req, res) => {
  if(!req.user){
    return res.status(401).send('Unauthorized');
  }

  res.send({
    success: true,
    user: req.user,
  });
}
