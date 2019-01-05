const router = require('express').Router({ mergeParams: true });
const { reviews } = require('../../controllers');

// router.get('/', reviews.post);
router.post('/', reviews.postOne);

module.exports = router;