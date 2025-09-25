const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {JWT_SECRET} = require('../configs/env');

exports.authorize = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Get user from token
            req.user = await User.findByPk(decoded.user_id, {
                attributes: {exclude: ['password']}
            });

            if (!req.user) {
                return res.status(401).json({
                    message: "User not found",
                    success: false
                });
            }

            // Move to next middleware
            next();

        } catch (error) {
            console.error('Token verification error:', error.message);
            return res.status(401).json({
                message: "Invalid or expired token",
                error: error.message,
                success: false
            });
        }
    } else {
        return res.status(401).json({
            message: "Access denied. No token provided",
            success: false
        });
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            message: "Admin access required",
            success: false,
        })
    }
}