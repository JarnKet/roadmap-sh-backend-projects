const {config} = require('dotenv');

config({
    path: '.env',
});

const {API_BASE_URL, TMDB_API_KEY} = process.env

module.exports = {
    API_BASE_URL,
    TMDB_API_KEY
}