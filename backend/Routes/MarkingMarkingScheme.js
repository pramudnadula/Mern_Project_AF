const router = require("express").Router();
const {
  createMarkingMarkingScheme,
} = require("../Controllers/MarkingMarkingScheme");
const MarkingScheme = require("../Models/MarkingMarkingScheme");

router.post("/", createMarkingMarkingScheme);

module.exports = router;
