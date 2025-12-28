const { Router } = require("express");
const router = Router();

// we can also import express first and then from express we can get router like below
// const express = require("express");
// const router = express.Router();
// this way we dont need to import express

const { register, login } = require("../controllers/authController")

router.post("/register", register);

router.post("/login", login);

module.exports = router;