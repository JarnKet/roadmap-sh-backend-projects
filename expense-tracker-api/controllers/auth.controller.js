const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Local Imports
const db = require('../models');
const {JWT_SECRET} = require('../configs/env');


// Register a new user
async function register(req, res) {
    try {
        //     1. Get data from req.body

        const {username, password} = req.body;

//     2. Validate the data
        if (!username || !password) {
            return res.status(400).json({message: 'Username and password are required', success: false});
        }

//     3. Check if the user already exists
        const existingUser = await db.User.findOne({
            where: {username}
        })

        if (existingUser) {
            return res.status(409).json({message: 'Username already exists', success: false});
        }

//     4. Hash the password
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);

//     5. Create the user in the database
        const newUser = await db.User.create({
            username,
            password: hashedPassword
        })

//     6. Generate a JWT token
        const token = jwt.sign({
            userId: newUser.id,
            username: newUser.username,
        }, JWT_SECRET, {
            expiresIn: '1h'
        })

//     7. Send the response
        res.status(200).json({
            message: 'User successfully registered',
            success: true,
            data: {
                user: {
                    id: newUser.id,
                    username: newUser.username,
                },
                accessToken: token
            }
        })
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({message: 'Internal server error', success: false});
    }
}


// Login
async function login(req, res) {
    try {
        //     1. Get data from req.body
        const {username, password} = req.body;

        //     2. Validate the data
        if (!username || !password) {
            return res.status(400).json({message: 'Username and password are required', success: false});
        }

        //     3. Check if the user exists
        const existingUser = await db.User.findOne({
            where: {username}
        });

        if (!existingUser) {
            return res.status(401).json({message: 'Invalid Credentials', success: false});
        }

        //     4. Compare the password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).json({message: 'Username or password are not correct', success: false});
        }

        //     5. Generate a JWT token
        const token = jwt.sign({
            userId: existingUser.id,
            username: existingUser.username,
        }, JWT_SECRET, {
            expiresIn: '1h'
        })

        //     6. Send the response
        res.status(200).json({
            message: 'User successfully logged in',
            success: true,
            data: {
                user: {
                    id: existingUser.id,
                    username: existingUser.username,
                },
                accessToken: token
            }
        })
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({message: 'Internal server error', success: false});
    }
}

module.exports = {
    register,
    login
}