const { getConversation, createConveration, getConversationgroup, createoutsidecoversation, checksend } = require("../Controllers/Conversation");
const router = require("express").Router();
const isAuth = require("../middleware/auth");//pass the middleware


//new con
router.post("/", isAuth, createConveration)
//get con of user
router.get("/:userId", isAuth, getConversation)
router.post("/group", isAuth, getConversationgroup)
router.post("/createout", isAuth, createoutsidecoversation)
router.post("/check", isAuth, checksend)



module.exports = router;