const { addmessage, getmessages } = require("../Controllers/Messages");
const router = require("express").Router();
const isAuth = require("../middleware/auth");//pass the middleware


//add
router.post("/", isAuth, addmessage)
//get
router.get("/:conversationId", isAuth, getmessages)

module.exports = router;