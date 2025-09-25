const sequelize = require('../configs/database');

exports.testDBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Unable to connect DB", error);
    }
}

exports.syncDB = async () => {
    try {
        // Use alter: true for development, but NEVER use force: true in production
        // force: true will drop all tables and recreate them (data loss!)
        await sequelize.sync({
            alter: true, // Safely modify table structure to match models
            force: false, // Never drop tables
        });

        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Unable to sync database:", error);
    }
}