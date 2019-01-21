const router = require('express').Router();

router.use('/experiences', require('./experiences'));
router.use('/booked', require('./booked'));
router.use('/', require('./images'));

module.exports = router;
