const imagesRouter = require('express').Router();
const { getImages, prepUpload } = require('../../controllers/images');

imagesRouter.get('/get-images', getImages);

imagesRouter.get('/prep-upload', prepUpload);

module.exports = imagesRouter;
