const {config} = require('dotenv');

config({
    path:'.env'
})

const {WEATHER_API_KEY, PORT, REDIS_PORT} = process.env

module.exports = {
    WEATHER_API_KEY,
    PORT,
    REDIS_PORT
}