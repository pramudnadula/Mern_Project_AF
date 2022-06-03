const router = require('express').Router();

const { addconatact, getMycontactQuestions, deletecontact, getallContacts, addReplay } = require('../Controllers/AdminContact');
const isAuth = require("../middleware/auth");//pass the middleware

router.post("/create", isAuth, addconatact)
router.post("/getspecific", isAuth, getMycontactQuestions)
router.post("/deletecontact", isAuth, deletecontact)
router.get("/getall", isAuth, getallContacts)
router.post("/addreply", isAuth, addReplay)

module.exports = router;