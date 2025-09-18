const {DataTypes} = require('sequelize');
const sequelize = require('../configs/database');

const Todo= sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT, // ใช้ TEXT สำหรับข้อความที่อาจจะยาวกว่า STRING
        allowNull: true // อนุญาตให้คำอธิบายเป็นค่าว่างได้
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // ค่าเริ่มต้นคือยังทำไม่เสร็จ
    }
},{
    tableName: 'todos',
});

module.exports = Todo;