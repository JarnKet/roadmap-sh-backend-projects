const sequelize = require("../configs/database");

const User = require("./user.model");
const Todo = require("./todo.model");

// Instance
const db = {};

db.sequelize = sequelize;

// นำ models เข้ามาใน object db
db.User = User;
db.Todo = Todo;

// --- กำหนดความสัมพันธ์ระหว่าง Models ---
db.User.hasMany(db.Todo,{
    foreignKey: "userId",  // กำหนด foreign key ในตาราง todos
    onDelete: "CASCADE",  // ถ้าลบ User ให้ลบ Todo ของ User นั้นด้วย
});

db.Todo.belongsTo(db.User,{
    foreignKey: "userId",  // กำหนด foreign key ในตาราง todos
});

module.exports = db;