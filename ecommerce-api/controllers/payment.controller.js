const {STRIPE_SECRET_KEY} = require("../configs/env");
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const db = require('../models');

// @desc    Create a stripe checkout session
// @route   POST /api/payments/create-checkout-session
// @access  Private
exports.createCheckoutSession = async (req, res) => {
    try {
        // 1. Get the user's cart
        const cart = await db.Cart.findOne({
            where: { UserId: req.user.id },
            include: [{
                model: db.CartItem,
                include: [db.Product]
            }]
        });

        if (!cart || !cart.db.CartItem || cart.db.CartItem.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        // 2. Format cart items for Stripe's line_items
        const line_items = cart.db.CartItem.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.Product.name,
                    },
                    // Price must be in the smallest currency unit (e.g., cents)
                    unit_amount: Math.round(item.Product.price * 100),
                },
                quantity: item.quantity,
            };
        });

        // 3. Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            // IMPORTANT: These URLs are placeholders. In a real app,
            // you would have actual frontend pages for success and cancel.
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cancel`,
        });

        // 4. Send the session URL back to the client
        res.status(200).json({ url: session.url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};