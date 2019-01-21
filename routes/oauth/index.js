const oauthRouter = require('express').Router();
const { oauth } = require('../../controllers');

oauthRouter.route('/login').get(oauth.login);
oauthRouter.route('/logout').get(oauth.logout);
oauthRouter.route('/redirect').get(oauth.redirect);
oauthRouter.route('/user').get(oauth.getUser);

module.exports = oauthRouter;
