const {Router} = require('express');

const {initialRenderWeight, postRenderWeight} = require('../controllers/weight.controller');

const weightRouter = Router();

weightRouter.get("/", initialRenderWeight);
weightRouter.post("/", postRenderWeight);

module.exports = weightRouter;