const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../configs/env');
const {pool} = require('../configs/database');


// Register a new user
exports.register = async (req, res) => {
    try{
        // 1. Get user input
        const {username, email, password} = req.body;

        // 2. Validate user input
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

    //     3. Check if user already exists
        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: "User with this username or email already exists",
                success: false,
            });
        }

    //     4. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    //     5. Create user in the database
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        // 6. Generate JWT Token
        const token = jwt.sign({userId: result.insertId, username, email}, JWT_SECRET, {
            expiresIn: '2h',
        });

        // 7. Send response
        res.status(201).json({
            message: "User registered successfully",
            success: true,
            data: {
                userId: result.insertId,
                username,
                email,
                accessToken: token,
            },
        });

    }catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
        })
    }
}


// Login
exports.login = async (req, res) => {
    try{
    //     1. Get user input
        const {username, password} = req.body;

    //     2. Validate user input
        if (!username || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

    //     3. Check if user exists
        const [users] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password",
                success: false,
            });
        }

    //     4. Compare password
        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid username or password",
                success: false,
            });
        }

    //     5. Generate JWT Token
        const token = jwt.sign({userId: user.id, username: user.username, email: user.email}, JWT_SECRET, {
            expiresIn: '2h',
        });

    //     6. Send response
        res.status(200).json({
            message: "Login successful",
            success: true,
            data: {
                userId: user.id,
                username: user.username,
                email: user.email,
                accessToken: token,
            },
        });

    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
        })
    }
}

// Get Profile
exports.getProfile = async (req, res)=> {
    try{
    //     1. Get userId from req.user
        const userId = req.user.userId;

    //     2. Fetch user from database
        const [users] = await pool.query(
            'SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        const user = users[0];

    //     3. Send response
        res.status(200).json({
            message: "User profile fetched successfully",
            success: true,
            data: user,
        });
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
        })
    }
}