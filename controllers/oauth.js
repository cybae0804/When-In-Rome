const passport = require('../config/passport-setup');

exports.login = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.logout = async (req, res) => {
  res.send('logging out')
};

exports.redirect = passport.authenticate('google', {
  failureRedirect: '/oauth/loginFailure',
  successRedirect: '/oauth/loginSuccess',
  session: true,
});