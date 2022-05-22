const router = require("express").Router();
const {
  createMarkingScheme,
  getAllMarkingSchemes,
  getMarkingScheme,
} = require("../Controllers/MarkingScheme");

router.post("/add", createMarkingScheme);
router.get("/", getAllMarkingSchemes);
router.get("/view/:id", getMarkingScheme);

module.exports = router;
