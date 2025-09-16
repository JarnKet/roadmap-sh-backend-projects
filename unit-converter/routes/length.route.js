const { Router } = require('express');

const { initialRenderLength, postRenderLength } = require('../controllers/length.controller');

const lengthRouter = Router();

lengthRouter.get('', initialRenderLength)

lengthRouter.post('', postRenderLength);

module.exports = lengthRouter;