const express = require('express');
const cors = require('cors');
const productRoute = require('./src/routes/product.route')
const userRoute = require('./src/routes/user.route')
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
// cors
app.use(express.json());
const corsOptions = {
    origin: "https://exomerce-cart.web.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(cookieParser());
// Test Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// API Routes
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);


// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
