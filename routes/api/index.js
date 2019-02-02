const router = require('express').Router();

router.use('/experiences', require('./experiences'));
router.use('/dashboard', require('./dashboard'));
router.use('/', require('./images'));
router.use('/auth-local', require('./auth_local'));

module.exports = router;
