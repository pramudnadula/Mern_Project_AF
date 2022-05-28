const router = require('express').Router();
const authController = require("../Controllers/admin");
//const { login } = require("../Controllers/admin");


router.post("/login", authController.login);


module.exports = router;