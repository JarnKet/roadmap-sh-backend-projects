const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../configs/env");

function authorize(req, res, next) {
    // 1. Get the token from the request header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({message: "A token is required for authentication", success: false});
    }

    try {

        // 2. The header format is "Bearer TOKEN". We split and get the token part.
        const token = authHeader.split(" ")[1];

        //     3. Verify the token using JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);

        // 4. If verification is successful, attach the decoded payload to the request object
        req.user = decoded;


    } catch (error) {
        console.error(error);
        res.status(401).json({message: "Invalid Token", success: false});
    }

    return next();

}

module.exports = authorize;