const authLocalRouter = require('express').Router();
const { authLocal } = require('../../controllers');

authLocalRouter.route('/login')
  .post(authLocal.login);

module.exports = authLocalRouter;