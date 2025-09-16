const {Router} = require('express');

const {initialRenderTemperature, postRenderTemperature} = require('../controllers/temperature.controller');


const temperatureRouter = Router();

temperatureRouter.get("/", initialRenderTemperature)
temperatureRouter.post("/", postRenderTemperature)


module.exports = temperatureRouter;