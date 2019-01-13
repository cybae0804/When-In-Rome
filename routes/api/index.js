const router = require('express').Router();

router.use('/experiences', require('./experiences'));
router.use('/', require('./images'));

module.exports = router;
