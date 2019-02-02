const { localPassport } = require('../config/passport-setup');

exports.login = localPassport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/',
  session: true,
});
