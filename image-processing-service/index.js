const express = require('express');
const cors = require('cors');

// Local Imports
const {PORT} = require('./configs/env');
const connectDB = require('./configs/database');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const imageRouter = require('./routes/image.route');

const app = express();

// Connect to the database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', (req, res) => {
    res.status(200).json({message: "Image Processing Service is up and running!"});
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/images', imageRouter);

// Starting the server
app.listen(PORT, () => {
    console.log(`Image Processing Service is running on port ${PORT}`);
});