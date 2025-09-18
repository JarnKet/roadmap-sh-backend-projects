const sequelize = require('../configs/database');

const User = require('./user.model');
const Expense = require('./expense.model');

// Instance

const db = {
    sequelize,
    User,
    Expense,
}

// Associations
// กำหนดความสัมพันธ์: User หนึ่งคนมีได้หลาย Expenses
User.hasMany(Expense, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    onDelete: 'CASCADE',
})

// กำหนดความสัมพันธ์: Expense หนึ่งรายการเป็นของ User เพียงคนเดียว
Expense.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
})

module.exports = db