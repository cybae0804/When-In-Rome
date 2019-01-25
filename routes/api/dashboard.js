const dashboardRouter = require('express').Router();
const { dashboard } = require('../../controllers');

dashboardRouter.route('/')
  .get(dashboard.getDashboard);

module.exports = dashboardRouter;
