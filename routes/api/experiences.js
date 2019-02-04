const experiencesRouter = require('express').Router();
const { experiences } = require('../../controllers');
const reviewsRouter = require('./reviews');
const datesRouter = require('./dates');

experiencesRouter.route('/')
  .get(experiences.getAll)
  .post(experiences.post);

experiencesRouter.route('/created')
  .get(experiences.getCreated);
  
experiencesRouter.route('/:experience_id')
  .get(experiences.getOne)
  .put(experiences.put)
  .delete(experiences.delete);

experiencesRouter.use('/:experience_id/reviews', reviewsRouter);
experiencesRouter.use('/:experience_id/dates', datesRouter);

module.exports = experiencesRouter;
