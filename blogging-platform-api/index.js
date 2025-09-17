const express = require('express');
const cors = require('cors');

// Local imports
const { PORT: SERVER_PORT } = require('./configs/env');
const dbPool = require('./configs/db');

const app = express();
const PORT = SERVER_PORT

const postRouter = require('./routes/post.route');


// Middlewares
app.use(cors());
app.use(express.json());

// Simple check to see if the database connection is successful
dbPool.getConnection()
    .then(connection => {
        console.log('✅ Successfully connected to the database.');
        connection.release(); // Release the connection back to the pool
    })
    .catch(error => {
        console.error('❌ Error connecting to the database:', error);
    });


//Routes
app.get("/", (req, res) => {
    res.send("Welcome to the Blogging Platform API");
})

app.use('/api/v1/posts', postRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});