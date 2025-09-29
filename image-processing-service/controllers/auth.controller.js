const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Local Imports
const User = require('../models/user.model');
const {JWT_SECRET, JWT_EXPIRES_IN} = require('../configs/env');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        // 1. Validate request body
        const {username, password} = req.body;

        // 2. Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({message: "Username and password are required", success: false});
        }

        //     3. Check if user already exists
        const existingUser = await User.findOne({
            username
        });

        if (existingUser) {
            return res.status(409).json({message: "Username already exists", success: false});
        }

        //     4. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //     5. Create a new user
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        //    6. Generate JWT token
        const token = jwt.sign({id: newUser._id, username: newUser.username}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        //     7. Send response
        res.status(201).json({
            message: "User registered successfully",
            success: true,
            data: {
                user: {
                    id: newUser._id,
                    username: newUser.username
                },
                token
            }
        });

    } catch (error) {
        console.error("Error in register controller:", error);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        //     1. Get Input Data
        const {username, password} = req.body;

        //     2. Validate Input Data
        if (!username || !password) {
            return res.status(400).json({message: "Username and password are required", success: false});
        }

        //     3. Check if user exists
        const user = await User.findOne({
            username
        })

        if (!user) {
            return res.status(401).json({message: "Invalid credentials", success: false});
        }

    //     4. Check Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({message: "Invalid credentials", success: false});
        }

    //     5. Generate JWT Token
        const token = jwt.sign({id: user._id, username: user.username}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    //     6. Send Response
        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username
                },
                token
            }
        });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}