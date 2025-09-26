const {Router} = require('express');

// Local Imports
const {createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout} = require('../controllers/workout.controller');
const {authorize} = require('../middlewares/auth.middleware');

const workoutRouter = Router();

workoutRouter.route("/")
    .get(authorize, getWorkouts)
    .post(authorize, createWorkout);

workoutRouter.route("/:id")
    .get(authorize, getWorkout)
    .put(authorize, updateWorkout)
    .delete(authorize, deleteWorkout)

module.exports = workoutRouter;