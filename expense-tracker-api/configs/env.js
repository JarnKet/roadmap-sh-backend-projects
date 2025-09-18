const {config} = require('dotenv');

config({
    path: '.env',
});

const {PORT, DB_HOST, DB_PASSWORD, DB_USER, DB_NAME, JWT_SECRET} = process.env

module.exports ={
    PORT,
    DB_HOST,
    DB_PASSWORD,
    DB_USER,
    DB_NAME,
    JWT_SECRET
}