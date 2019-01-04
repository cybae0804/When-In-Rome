const router = require('express').Router();
const { reviews } = require('../../controllers');

router.get('/', reviews.getOne);

module.exports = router;