const authLocalRouter = require('express').Router();
const { authLocal } = require('../../controllers');

authLocalRouter.route('/')
  .post(authLocal.login);

module.exports = authLocalRouter;
