const { getstage } = require("../Controllers/Groupstage");
const isAuth = require("../middleware/auth");//pass the middleware

const router = require("express").Router();



router.get("/:id", isAuth, getstage)




module.exports = router;