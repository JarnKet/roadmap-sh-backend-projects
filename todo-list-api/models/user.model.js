const {DataTypes} = require('sequelize');
const sequelize = require('../configs/database');

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // อีเมลต้องไม่ซ้ำกัน
        validate: {
            isEmail: true // ตรวจสอบว่าเป็นรูปแบบอีเมลที่ถูกต้อง
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "users", // กำหนดชื่อตาราง
})

module.exports = User