const datesRouter = require('express').Router({ mergeParams: true });
const { dates } = require('../../controllers');

datesRouter.route('/')
  .get(dates.get);

module.exports = datesRouter;
