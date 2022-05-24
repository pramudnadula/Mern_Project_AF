const { getstage } = require("../Controllers/Groupstage");

const router = require("express").Router();



router.get("/:id", getstage)




module.exports = router;