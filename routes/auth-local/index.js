const authLocalRouter = require('express').Router();
const { authLocal } = require('../../controllers');

authLocalRouter.route('/login')
  .post(authLocal.login);

authLocalRouter.route('/signup')
  .post(authLocal.signup);

module.exports = authLocalRouter;