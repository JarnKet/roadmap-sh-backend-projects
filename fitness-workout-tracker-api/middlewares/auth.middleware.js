const jwt = require('jsonwebtoken');

// Local Imports
const {JWT_SECRET} = require('../configs/env');

exports.authorize = (req, res, next) => {
//     1. Get token from headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

//     2. Check if token is present
    if (!token) {
        return res.status(401).json({
            message: "Access Denied. No token provided.",
            success: false,
        });
    }

//     3. Verify token
    try{
        req.user = jwt.verify(token, JWT_SECRET);
        next();

    }catch(error){
        res.status(401).json({
            message: "Invalid Token",
            error: error.message,
            success: false,
        })
    }
}