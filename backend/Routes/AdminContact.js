const router = require('express').Router();

const { addconatact, getMycontactQuestions } = require('../Controllers/AdminContact');
const isAuth = require("../middleware/auth");//pass the middleware

router.post("/create", isAuth, addconatact)
router.get("/getspecific", isAuth, getMycontactQuestions)

module.exports = router;