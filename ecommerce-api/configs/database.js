const {Sequelize} = require('sequelize');

const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT} = require('./env');

// Create a new Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false, // Disable logging; default: console.log
});

module.exports = sequelize;