const { getConversation, createConveration, getConversationgroup } = require("../Controllers/Conversation");
const router = require("express").Router();


//new con
router.post("/", createConveration)
//get con of user
router.get("/:userId", getConversation)
router.post("/group", getConversationgroup)



module.exports = router;