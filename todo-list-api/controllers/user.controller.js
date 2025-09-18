const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../configs/env");

// Create a User by register
async function register(req, res) {
    try {
        //     1. Get data from request body
        const {name, email, password} = req.body;

        //     2. Validate data
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required", success: false});
        }

        //     3. Check if user already exists
        const existingUser = await db.User.findOne({where: {email}});
        if (existingUser) {
            return res.status(409).json({message: "User already exists", success: false});
        }

        //     4. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //     5. Create User
        const user = await db.User.create(
            {
                name,
                email,
                password: hashedPassword
            }
        )

        //     6. Create JWT token
        const token = jwt.sign(
            {userId: user.id, email: user.email},
            JWT_SECRET,
            {expiresIn: "2h"}
        )

        //     7. Return new user (without password) and token
        res.status(201).json({
            message: "User created successfully",
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                accessToken: token,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server Error", success: false});
    }
}


// Login

async function login(req, res) {
    try{
    //     1.Get data from request body
        const {email, password} = req.body;

    //     2.Validate data
        if (!email || !password) {
            return res.status(400).json({message: "All fields are required", success: false});
        }

    //     3.Check if user exists
        const user = await db.User.findOne({
            where: {email}
        })

        if (!user) {
            return res.status(404).json({message: "User not found", success: false});
        }


    //     4.Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid credentials", success: false});
        }

    //     5.Create JWT token
        const token = jwt.sign(
            {userId: user.id, email: user.email},
            JWT_SECRET,
            {expiresIn: "2h"}
        )

    //     6.Return user (without password) and token
        res.status(201).json({
            message: "Login successful",
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                accessToken: token,
            }
        })
    }catch (error){
        console.error(error);
        res.status(500).json({message: "Server Error", success: false});
    }
}

module.exports = {
    register,
    login,
}