const jwt = require('jsonwebtoken');

// Local Imports
const {JWT_SECRET} = require('../configs/env');
const db = require('../models');

async function authorize(req, res, next) {

//         1. Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Access token is missing', success: false});
    }

    try {
        //     2. Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Attach the user information to the request object
        req.user = await db.User.findByPk(decoded.userId, {
            attributes: {exclude: ['password']}
        })

        // 4. If user not found, return 401
        if (!req.user) {
            return res.status(401).json({message: 'User not found', success: false});
        }

        // 5. If everything is fine, proceed to the next middleware/controller

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({message: 'Invalid or expired token', success: false});
    }


}

module.exports = authorize;