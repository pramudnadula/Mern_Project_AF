const router = require("express").Router();
const {
  createMarkingMarkingScheme, getMarkingMarkingScheme,
} = require("../Controllers/MarkingMarkingScheme");
const MarkingScheme = require("../Models/MarkingMarkingScheme");

router.post("/", createMarkingMarkingScheme);
router.get("/view/:id", getMarkingMarkingScheme);

module.exports = router;
