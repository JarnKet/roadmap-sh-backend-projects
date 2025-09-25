const {config} = require('dotenv');

config({
    path: '.env',
});

const {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_DIALECT,
    JWT_SECRET,
    STRIPE_SECRET_KEY
} = process.env

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_DIALECT,
    JWT_SECRET,
    STRIPE_SECRET_KEY
}