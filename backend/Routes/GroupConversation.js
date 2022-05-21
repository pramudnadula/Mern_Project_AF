const { createGroupchat } = require("../Controllers/GroupConversation");

const router = require("express").Router();

router.post('/', createGroupchat)

module.exports = router;