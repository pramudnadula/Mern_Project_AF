const { addmessage, getmessages } = require("../Controllers/Messages");
const router = require("express").Router();


//add
router.post("/", addmessage)
//get
router.get("/:conversationId", getmessages)

module.exports = router;