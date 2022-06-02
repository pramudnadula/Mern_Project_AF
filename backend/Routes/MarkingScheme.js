const router = require("express").Router();
const isAuth = require("../middleware/auth"); //pass the middleware
const {
  createMarkingScheme,
  getAllMarkingSchemes,
  getMarkingScheme,
} = require("../Controllers/MarkingScheme");

router.post("/add", isAuth, createMarkingScheme);
router.get("/", isAuth, getAllMarkingSchemes);
router.get("/view/:id", isAuth, getMarkingScheme);

module.exports = router;
