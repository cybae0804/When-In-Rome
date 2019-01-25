const reviewsRouter = require('express').Router({ mergeParams: true });
const { reviews } = require('../../controllers');

reviewsRouter.route('/')
  .post(reviews.postOne);

module.exports = reviewsRouter;
