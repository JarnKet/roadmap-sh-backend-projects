const {config} = require('dotenv');

config({
    path: '.env',
});

const {PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, JWT_SECRET } = process.env

module.exports = {
    PORT: PORT || 3000,
    DB_PORT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    JWT_SECRET,
}