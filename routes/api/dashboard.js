const dashboardRouter = require('express').Router();
const { dashboard } = require('../../controllers');

dashboardRouter.route('/host')
  .get(dashboard.getHostDashboard);

dashboardRouter.route('/user');

module.exports = dashboardRouter;
