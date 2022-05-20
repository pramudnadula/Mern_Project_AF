const { getConversation, createConveration } = require("../Controllers/Conversation");
const router = require("express").Router();


//new con
router.post("/", createConveration)
//get con of user
router.get("/:userId", getConversation)



module.exports = router;