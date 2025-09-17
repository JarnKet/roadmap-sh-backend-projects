const axios = require('axios');
const {WEATHER_API_KEY} = require('../configs/env');
const {redisClient, CACHE_EXPIRATION_SECONDS} = require('../configs/redis');

async function getWeather(req, res) {
    const city = req.params.city.toLowerCase();

    if (!city) {
        return res.status(400).json({error: 'City parameter is required'});
    }

    try {
// Check cache
        const cachedData = await redisClient.get(city);

        if (cachedData) {
            console.log("Cache Hit for: ", city);
            return res.status(200).json(JSON.parse(cachedData));
        }

        // Cached Miss - Fetch from API
        console.log("Cache Miss for: ", city);
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json`;

        const weatherResponse = await axios.get(apiUrl);

        if (weatherResponse.status === 200) {
            const data = weatherResponse.data;

            console.log("Weather Data", data);

            await redisClient.set(city, JSON.stringify(data), {
                EX: CACHE_EXPIRATION_SECONDS,
            })

            return res.status(200).json(data);
        } else {
            return res.status(weatherResponse.status).json({error: 'Error fetching weather data'});
        }
    } catch (err) {
        res.status(500).json({error: 'Internal Server Error'});
    }


}

module.exports = {
    getWeather
}