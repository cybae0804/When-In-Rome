const imagesRouter = require('express').Router();
const { prepUpload } = require('../../controllers/images');

imagesRouter.get('/prep-upload', prepUpload);

module.exports = imagesRouter;
