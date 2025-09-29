const jwt = require('jsonwebtoken');

// Local Imports
const {JWT_SECRET} = require('../configs/env');
const User = require('../models/user.model');

exports.authorize = async (req, res, next) => {
    try {
        // 1. Get token from headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Access token required', 
                success: false
            });
        }

        const token = authHeader.substring(7); // More efficient than split

        // 2. Verify token (will throw error if invalid/expired)
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Check if user exists and is active
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                message: 'User not found or unauthorized',
                success: false
            });
        }

        // 4. Attach user to request
        req.user = user;
        next();

    } catch (error) {
        // Handle JWT specific errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired',
                success: false
            });
        }

        // Log error properly (use logger in production)
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({
            message: 'Authentication failed',
            success: false
        });
    }
}