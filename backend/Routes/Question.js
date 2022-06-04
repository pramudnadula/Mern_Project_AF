const { addquestion, getallQuestions } = require("../Controllers/Question");
const isAuth = require("../middleware/auth");//pass the middleware

const router = require('express').Router();



router.post('/create', isAuth, addquestion)
router.get('/all', isAuth, getallQuestions)


module.exports = router;