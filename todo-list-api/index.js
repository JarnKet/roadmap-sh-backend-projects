const express = require('express');
const cors = require('cors');

// Local Imports
const {PORT} = require('./configs/env');
const {testDBConnection, syncDatabase} = require('./utils/database');
const authorize = require('./middlewares/auth.middleware');

const userRouter = require('./routes/user.route');
const todoRouter = require('./routes/todo.route');
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Test DB Connection
testDBConnection();
syncDatabase();


// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Todo List API");
})

app.get("/api/v1/test-token", authorize, (req, res) => {
    res.status(200).json({
        message: "Token is valid", success: true, user: req.user
    });
})

app.use("/api/v1", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

