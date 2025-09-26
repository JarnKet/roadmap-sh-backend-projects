const {Router} = require('express');

// Local Imports
const {authorize} = require('../middlewares/auth.middleware');
const {getAllExercises} = require('../controllers/exercise.controller');

const exerciseRouter = Router();

exerciseRouter.get('/', authorize, getAllExercises);


module.exports = exerciseRouter;
