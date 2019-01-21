const bookedRouter = require('express').Router();
const { booked } = require('../../controllers');

bookedRouter.route('/')
  .get(booked.getHostBooked);

module.exports = bookedRouter;
