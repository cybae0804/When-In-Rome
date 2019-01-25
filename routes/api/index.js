const router = require('express').Router();

router.use('/experiences', require('./experiences'));
router.use('/dashboard', require('./dashboard'));
router.use('/dates', require('./dates'));
router.use('/', require('./images'));

module.exports = router;
