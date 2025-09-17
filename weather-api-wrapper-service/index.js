const express = require('express');

// Local imports
const {PORT : SERVER_PORT, WEATHER_API_KEY} = require('./configs/env');
const {redisClient} = require('./configs/redis');
const limiter = require('./configs/rate-limit');

const weatherRouter = require('./routes/weather.route');

const app = express();
const PORT = SERVER_PORT || 3000;

// Middleware
app.use(express.json());
app.use(limiter);

(async ()=>{
   redisClient.on('error', (err) => console.log('Redis Client Error', err));
   await redisClient.connect();
   console.log("Connected to Redis...");
})()

app.get("/", (req, res) => {
    res.send("Hello from Weather API Wrapper Service!");
})

// All Routes
app.use("/api/v1/weather", weatherRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})