const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./oauth');

const configuredPassport = passport.use(
  new GoogleStrategy(config, (accessToken, refreshToken, profile, done) => {
    console.log('profile: ', profile);
    console.log('access token: ', accessToken);
    return done(null, profile);
  }
));

module.exports = configuredPassport;