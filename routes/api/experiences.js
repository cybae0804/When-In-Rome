const router = require('express').Router();
const { experiences } = require('../../controllers');

router.get('/', experiences.getAll);
router.get('/:experience_id', experiences.getOne);

// app.post('/api/experiences', (req, res) => {
// });
// app.put('/api/experiences/:experience_id', (req, res) => {
// });
// app.delete('/api/experiences/:experience_id', (req, res) => {
// });

// // Reviews
// app.post('/api/experiences/:experience_id/reviews', (req, res) => {
// });

// // Dates
// app.get('/api/experiences/:experience_id/dates', (req, res) => {
// });
// app.post('/api/experiences/:experience_id/dates', (req, res) => {
// });
// app.put('/api/experiences/:experience_id/dates/:date_id', (req, res) => {
// });
// app.delete('/api/experiences/:experience_id/dates/:date_id', (req, res) => {
// });

module.exports = router;
