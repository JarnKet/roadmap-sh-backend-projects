const redis = require('redis');

const {REDIS_PORT} = require('./env');

const CACHE_EXPIRATION_SECONDS = 43200;

const redisClient = redis.createClient(REDIS_PORT);


module.exports = {
    redisClient,
    CACHE_EXPIRATION_SECONDS
};