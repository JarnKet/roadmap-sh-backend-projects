const {config} = require('dotenv');

config({
    path: '.env',
});

const {PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, JWT_SECRET} = process.env;

module.exports = {
    PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    JWT_SECRET
}