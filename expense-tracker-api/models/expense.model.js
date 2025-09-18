const {DataTypes} = require('sequelize');

const sequelize = require('../configs/database');

const Expense = sequelize.define("Expense", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category:{
        type: DataTypes.ENUM(
            'Groceries',
            'Leisure',
            'Electronics',
            'Utilities',
            'Clothing',
            'Health',
            'Others'
        ),
        allowNull: false,
    },
    amount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    tableName: 'expenses',
})

module.exports = Expense;