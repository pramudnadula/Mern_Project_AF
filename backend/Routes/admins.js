const router = require('express').Router();
const authController = require("../Controllers/admin");
//const { login } = require("../Controllers/admin");


router.post("/login", authController.loginAdmin);


module.exports = router; 