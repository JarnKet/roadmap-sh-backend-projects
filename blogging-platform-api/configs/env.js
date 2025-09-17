const {config} = require('dotenv');

config({
    path: '.env',
});

const {PORT, DB_PORT, DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = process.env

module.exports = {
    PORT: PORT || 3000,
    DB_PORT,
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_USER,
}