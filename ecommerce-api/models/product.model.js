const {DataTypes} = require('sequelize');
const sequelize = require('../configs/database');

const Product = sequelize.define('Product', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,
    },
}, {
    tableName: 'products',
})

module.exports = Product;