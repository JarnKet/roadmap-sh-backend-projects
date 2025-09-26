const express = require('express');
const cors = require('cors');


//Local Imports
const {PORT} = require('./configs/env');
const {checkConnection} = require('./configs/database');
const authRouter = require('./routes/auth.controller');
const exerciseRouter = require('./routes/exercise.route');
const workoutRouter = require('./routes/workout.route');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Check Database Connection
checkConnection();


//Routes
app.get("/", (req, res) => {
    res.send("Fitness Workout Tracker API is running");
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/exercise", exerciseRouter);
app.use("/api/v1/workout", workoutRouter);

// Start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})