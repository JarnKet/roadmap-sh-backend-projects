const {config} = require('dotenv');

config({
    path: '.env',
});

const {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER
} = process.env

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
}