const {DataTypes} = require('sequelize');
const sequelize = require('../configs/database');

const Cart = sequelize.define('Cart', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    // The userId will be added automatically by the association
    user_id: { // Explicitly define the foreign key column
        type: DataTypes.UUID, // Match your User model's id type
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'carts',
})

module.exports = Cart;