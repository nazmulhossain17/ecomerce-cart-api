const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controller/user.controller");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout', logoutUser);

module.exports = router;