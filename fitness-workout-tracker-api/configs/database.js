const mysql = require('mysql2/promise');

// Local Imports
const {DB_NAME, DB_HOST, DB_PASSWORD, DB_USER} = require('../configs/env');

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// A simple function to test the connection
async function checkConnection() {
    try{
        const connection = await pool.getConnection();

        console.log("Database connected successfully");

        connection.release();
    }catch (error) {
        console.error("Database connection failed:", error);
    }
};

module.exports = {checkConnection, pool};