const oauthRouter = require('express').Router();
const { oauth } = require('../../controllers');
const passport = require('../../config/passport-setup');

oauthRouter.route('/login').get(oauth.login);
oauthRouter.route('/logout').get(oauth.logout);
oauthRouter.route('/redirect').get(oauth.redirect);

module.exports = oauthRouter;
