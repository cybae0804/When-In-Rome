const reviewsRouter = require('express').Router({ mergeParams: true });
const { reviews } = require('../../controllers');

reviewsRouter.route('/')
  .get(reviews.get)
  .post(reviews.postOne);

module.exports = reviewsRouter;
