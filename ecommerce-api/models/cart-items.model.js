const {DataTypes} = require('sequelize');
const sequelize = require('../configs/database');

const CartItem = sequelize.define('CartItems', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    cart_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'carts',
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    }
}, {
    tableName: 'cart_items',
})

module.exports = CartItem;