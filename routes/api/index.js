const router = require('express').Router();

// router.use('/experiences/:experience_id/reviews', require('./reviews'));
router.use('/experiences', require('./experiences'));

module.exports = router;
