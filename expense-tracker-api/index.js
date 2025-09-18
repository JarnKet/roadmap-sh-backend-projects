const express = require('express');
const cors = require('cors');

const app = express();

// Local Imports
const { PORT } = require('./configs/env');
const db = require('./models');
const authorize = require('./middlewares/auth.middleware');
const authRouter = require('./routes/auth.route');
const expenseRouter = require('./routes/expense.route');

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
    })
    .catch(err => {
        console.log('Error: ' + err);
    });

// Sync Database
db.sequelize.sync()
    .then(() => {
        console.log('Database synced...');
    })
    .catch(err => {
        console.log('Error: ' + err);
    });



// Routes
app.get('/', (req, res) => {
    res.send('Expense Tracker API is running');
})

app.get('/api/v1/test-token', authorize, (req, res) => {
    res.json({ message: 'Token is valid', user: req.user });
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/expenses', expenseRouter);


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})