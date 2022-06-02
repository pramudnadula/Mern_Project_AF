const router = require("express").Router();
const isAuth = require("../middleware/auth"); //pass the middleware
const {
  createMarkingMarkingScheme,
  getMarkingMarkingScheme,
  getMarkingMarkingSchemeByGroupId,
  getGroupByGroupId,
  getAllMarkingMarkingSchemes,
} = require("../Controllers/MarkingMarkingScheme");

router.post("/", isAuth, createMarkingMarkingScheme);
router.get("/views/", isAuth, getAllMarkingMarkingSchemes);
router.get("/view/:id", isAuth, getMarkingMarkingScheme);
router.get("/view/group/:id", isAuth, getMarkingMarkingSchemeByGroupId);
router.get("/group/:id", isAuth, getGroupByGroupId);

module.exports = router;
