const { getConversation, createConveration, getConversationgroup } = require("../Controllers/Conversation");
const router = require("express").Router();
const isAuth = require("../middleware/auth");//pass the middleware


//new con
router.post("/", isAuth, createConveration)
//get con of user
router.get("/:userId", isAuth, getConversation)
router.post("/group", isAuth, getConversationgroup)



module.exports = router;