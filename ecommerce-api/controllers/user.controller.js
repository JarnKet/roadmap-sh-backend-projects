const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Local Imports
const db = require('../models');
const {JWT_SECRET} = require('../configs/env');


// Registration
exports.register = async (req, res) => {
    try {
        //     1. Get user input
        const {firstName, lastName, email, password} = req.body;

        //     2. Validate user input
        if (!(email && password && firstName && lastName)) {
            return res.status(400).json({message: 'All input is required', success: false});
        }

        //     3. Check if user already exists
        const existingUser = await db.User.findOne({where: {email}});
        if (existingUser) {
            return res.status(409).json({message: 'User Already Exist. Please Login', success: false});
        }

        //     4. Encrypt user password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        //     5. Create user in database
        const newUser = await db.User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        })

        //     6. Return new user
        res.status(200).json({
            message: 'User Created Successfully!',
            success: true,
            data: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
            }
        });

    } catch (err) {
        res.status(500).json({message: 'Internal Server error', error: err.message, success: false});
    }
}

exports.login = async (req, res) => {
    try {
    //     1. Get user input
        const {email, password} = req.body;

    //     2. Validate user input
        if (!(email && password)) {
            return res.status(400).json({message: 'All input is required', success: false});
        }

    //     3. Check if user exists in database
        const user = await db.User.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({message: 'Invalid Credentials', success: false});
        }

    //     4. Compare user password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Invalid Credentials', success: false});
        }

    //     5. Create JWT token
        const token = jwt.sign(
            {user_id: user.id, email, role: user.role},
            JWT_SECRET,
            {
                expiresIn: '1d',
            }
        )

    //     6. Return user and token
        res.status(200).json({
            message: "Login Successful",
            success: true,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: token,
            }
        })
    } catch (error) {
        res.status(500).json({message: 'Internal Server error', error: error.message, success: false});
    }
}

exports.getProfile = async (req, res) => {


    res.status(200).json({
        message: "User Profile fetched successfully",
        success: true,
        data: req.user
    });
}