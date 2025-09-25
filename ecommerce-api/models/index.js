const sequelize = require('../configs/database');

// Import models
const User = require('./user.model');
const Product = require('./product.model');
const Cart = require('./cart.model');
const CartItem = require('./cart-items.model');

// Define associations

// One-to-One: User has one Cart
User.hasOne(Cart, {
    foreignKey: 'user_id' // Specify the actual column name in your database
});
Cart.belongsTo(User, {
    foreignKey: 'user_id'
});

Cart.hasMany(CartItem, {
    foreignKey: 'cart_id',
    onDelete: "CASCADE"
});
CartItem.belongsTo(Cart, {
    foreignKey: 'cart_id'
});

Product.hasMany(CartItem, {
    foreignKey: 'product_id'
});
CartItem.belongsTo(Product, {
    foreignKey: 'product_id'
});


// Export models and sequelize connection
const db = {
    sequelize,
    User,
    Product,
    Cart,
    CartItem
}

module.exports = db;