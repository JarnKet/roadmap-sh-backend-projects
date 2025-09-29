const mongoose = require('mongoose');

// Local Imports
const {DB_URI} = require("../configs/env")

const connectDB = async () => {
    try{
        const connection =  await mongoose.connect(DB_URI);
        console.log("Connected to MongoDB", connection.connection.host);
    }catch(err){
        console.error("Error connecting to the database", err);
        process.exit(1);
    }
}

module.exports = connectDB;