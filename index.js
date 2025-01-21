const express = require('express');
const productRoute = require('./src/routes/product.route')
const userRoute = require('./src/routes/user.route')
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// API Routes
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use(cookieParser());

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
