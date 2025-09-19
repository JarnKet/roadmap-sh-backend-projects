const express = require('express');

// Local Imports
const {PORT} = require('./configs/env');
const shortenRouter = require('./routes/shorten.route');
const {redirectOriginalUrl} = require('./controller/shorten.controller');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the URL Shortening Service");
})

app.use("/api/v1/shorten", shortenRouter);
app.get("/:shortCode", redirectOriginalUrl);


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})