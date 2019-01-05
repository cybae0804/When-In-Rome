const router = require('express').Router({ mergeParams: true });
const { reviews } = require('../../controllers');

router.get('/', reviews.getOne);

module.exports = router;