const mysql = require('mysql2/promise');

// Local Imports
const {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST} = require("../configs/env");

const pool = mysql.createPool(
    {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    }
)

module.exports = pool;