const imagesRouter = require('express').Router();
const { getImages, prepUpload, saveImage, test } = require('../../controllers/images');

imagesRouter.get('/get-images', getImages);

imagesRouter.get('/prep-upload', prepUpload);

imagesRouter.post('/save-image', saveImage);

imagesRouter.get('/test', test);

module.exports = imagesRouter;
