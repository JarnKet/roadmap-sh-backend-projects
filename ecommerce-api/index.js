const express = require('express');
const cors = require('cors');

// Local Imports
const {PORT} = require('./configs/env');
const {testDBConnection, syncDB} = require('./utils/database');

// Import models to establish associations
const db = require('./models');

const userRouter = require('./routes/user.route');
const productRouter = require('./routes/product.route');
const cartRouter = require('./routes/cart.route');
const paymentRouter = require('./routes/payment.route');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the E-commerce API",
        version: "1.0.0",
        endpoints: {
            users: "/api/v1/users",
            products: "/api/v1/products",
            cart: "/api/v1/cart",
            payments: "/api/v1/payments"
        }
    });
})

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/payments", paymentRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
        success: false
    });
});

// Handle 404 routes
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        success: false
    });
});

// Initialize database and start server
const startServer = async () => {
    try {
        await testDBConnection();
        await syncDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`API Documentation: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
