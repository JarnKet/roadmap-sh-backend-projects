const {Router} = require('express');

// Local Import
const {authorize} = require('../middlewares/auth.middleware');
const {
    getCart,
    addItemToCart,
    removeItemFromCart,
    updateCartItem,
    clearCart
} = require('../controllers/cart.controller');

const cartRouter = Router();

cartRouter.use(authorize);

cartRouter.get('/', getCart);
cartRouter.post('/items', addItemToCart);
cartRouter.put('/items/:productId', updateCartItem);
cartRouter.delete('/items/:productId', removeItemFromCart);
cartRouter.delete('/', clearCart);

module.exports = cartRouter;