const { createGroupchat } = require("../Controllers/GroupConversation");
const isAuth = require("../middleware/auth");//pass the middleware

const router = require("express").Router();

router.post('/', isAuth, createGroupchat)

module.exports = router;