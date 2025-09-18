const db = require('../models');

async function testDBConnection() {
    try {
        await db.sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }catch (e) {
        console.error("Unable to connect to the database:", e);
    }
}

async function syncDatabase() {
    try{
        db.sequelize.sync({
            force: false, // ถ้าเป็น true จะลบตารางเดิมแล้วสร้างใหม่
        })

        console.log("Database has been established successfully.");
    }catch (e){
        console.error("Unable to connect to the database:", e);
    }
}

module.exports = {
    testDBConnection,
    syncDatabase,
}