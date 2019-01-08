const experiencesRouter = require('express').Router();
const { experiences } = require('../../controllers');
const reviewsRouter = require('./reviews');

experiencesRouter.route('/')
  .get(experiences.getAll)
  .post(experiences.post);
experiencesRouter.route('/:experience_id')
  .get(experiences.getOne)
  .put(experiences.put);
experiencesRouter.use('/:experience_id/reviews', reviewsRouter);

module.exports = experiencesRouter;

// app.delete('/api/experiences/:experience_id', (req, res) => {
// });

// // Reviews
// app.post('/api/experiences/:experience_id/reviews', (req, res) => {
// });
// router.use('/:experience_id/dates', require('./dates'));
// // Dates

// app.get('/api/experiences/:experience_id/dates', (req, res) => {
// });
// app.post('/api/experiences/:experience_id/dates', (req, res) => {
// });
// app.put('/api/experiences/:experience_id/dates/:date_id', (req, res) => {
// });
// app.delete('/api/experiences/:experience_id/dates/:date_id', (req, res) => {
// });
