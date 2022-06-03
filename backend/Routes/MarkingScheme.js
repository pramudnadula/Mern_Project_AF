const router = require("express").Router();
const isAuth = require("../middleware/auth"); //pass the middleware
const {
  createMarkingScheme,
  getAllMarkingSchemes,
  getMarkingScheme,
  getMarkingSchemeBySubmissionType,
  getStudentGroupById,
} = require("../Controllers/MarkingScheme");

router.post("/add", isAuth, createMarkingScheme);
router.get("/", isAuth, getAllMarkingSchemes);
router.get("/view/:id", isAuth, getMarkingScheme);
router.get("/view/submission/:id", isAuth, getMarkingSchemeBySubmissionType);
router.get("/group/:id", isAuth, getStudentGroupById);

module.exports = router;
