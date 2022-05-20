const router = require('express').Router();
const { creategroup, getstudentgroup, addmember, existmember } = require('../Controllers/StudentGroup')

router.post("/", creategroup);
router.get("/:id", getstudentgroup);
router.get("/:id/add/:sid", addmember)
router.get("/:id/isexist/:sid", existmember)


module.exports = router;