const datesRouter = require('express').Router({ mergeParams: true });
const { dates } = require('../../controllers');

datesRouter.route('/')
  .get(dates.get)
  .post(dates.post);

module.exports = datesRouter;
