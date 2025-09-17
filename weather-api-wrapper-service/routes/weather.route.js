const {Router} = require('express');

const {getWeather} = require('../controllers/weather.controller');


const weatherRouter = Router();

weatherRouter.get("/:city", getWeather)

module.exports = weatherRouter;