// Local Imports
const db = require('../models');

// Helper function to get or create a cart for a user
const getCartForUser = async (userId) => {
    let cart = await db.Cart.findOne({
        where: {user_id: userId},
    });

    if (!cart) {
        cart = await db.Cart.create({user_id: userId});
    }

    return cart;
}

// @desc    Get user's shopping cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
    try {
        const cart = await getCartForUser(req.user.id);

        // Fixed: Query Cart with CartItems, not CartItem with Cart
        const cartWithItems = await db.Cart.findOne({
            where: {id: cart.id},
            include: [{
                model: db.CartItem,
                include: [{
                    model: db.Product,
                    attributes: ['id', 'name', 'price', 'description']
                }]
            }]
        });

        res.status(200).json({
            message: "Cart fetched successfully",
            success: true,
            data: cartWithItems,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
        })
    }
}

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
exports.addItemToCart = async (req, res) => {
    try {
        const {productId, quantity} = req.body;

        // Enhanced validation
        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Product ID and quantity are required",
                success: false,
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0",
                success: false,
            });
        }

        // Check if product exists
        const product = await db.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }

        // Check stock availability
        if (product.stock < quantity) {
            return res.status(400).json({
                message: "Insufficient stock available",
                success: false,
            });
        }

        const cart = await getCartForUser(req.user.id);

        let cartItem = await db.CartItem.findOne({
            where: {
                cart_id: cart.id,
                product_id: productId,
            }
        });

        if (cartItem) {
            // Check if adding quantity exceeds stock
            if (product.stock < (cartItem.quantity + quantity)) {
                return res.status(400).json({
                    message: "Adding this quantity would exceed available stock",
                    success: false,
                });
            }
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await db.CartItem.create({
                cart_id: cart.id,
                product_id: productId,
                quantity: quantity,
            })
        }

        // Return cart item with product details
        const cartItemWithProduct = await db.CartItem.findOne({
            where: { id: cartItem.id },
            include: [{
                model: db.Product,
                attributes: ['id', 'name', 'price', 'description']
            }]
        });

        res.status(201).json({
            message: "Item added to cart successfully",
            success: true,
            data: cartItemWithProduct,
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
        })
    }
}

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:productId
// @access  Private
exports.removeItemFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                success: false,
            });
        }

        const cart = await getCartForUser(req.user.id);

        const cartItem = await db.CartItem.findOne({
            where: {
                cart_id: cart.id,
                product_id: productId
            }
        });

        if (cartItem) {
            await cartItem.destroy();
            res.status(200).json({
                message: 'Item removed from cart successfully',
                success: true
            });
        } else {
            res.status(404).json({
                message: 'Item not found in cart',
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false
        });
    }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/items/:productId
// @access  Private
exports.updateCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                message: "Valid quantity is required",
                success: false,
            });
        }

        // Check if product exists and has enough stock
        const product = await db.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                message: "Insufficient stock available",
                success: false,
            });
        }

        const cart = await getCartForUser(req.user.id);

        const cartItem = await db.CartItem.findOne({
            where: {
                cart_id: cart.id,
                product_id: productId
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                message: 'Item not found in cart',
                success: false
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        const updatedCartItem = await db.CartItem.findOne({
            where: { id: cartItem.id },
            include: [{
                model: db.Product,
                attributes: ['id', 'name', 'price', 'description']
            }]
        });

        res.status(200).json({
            message: 'Cart item updated successfully',
            success: true,
            data: updatedCartItem
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false
        });
    }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res) => {
    try {
        const cart = await getCartForUser(req.user.id);

        await db.CartItem.destroy({
            where: {
                cart_id: cart.id
            }
        });

        res.status(200).json({
            message: 'Cart cleared successfully',
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false
        });
    }
};