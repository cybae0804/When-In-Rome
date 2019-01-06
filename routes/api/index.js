const router = require('express').Router();

router.use('/experiences', require('./experiences'));

module.exports = router;
