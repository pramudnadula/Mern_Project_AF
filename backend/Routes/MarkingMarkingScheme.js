const router = require("express").Router();
const isAuth = require("../middleware/auth"); //pass the middleware
const {
  createMarkingMarkingScheme,
  getMarkingMarkingScheme,
  getMarkingMarkingSchemeByGroupId,
  getGroupByGroupId,
  getAllMarkingMarkingSchemes,
  getAllDocumentUpload,
  getDocumentUploadByUserId,
  getSubmissionById,
} = require("../Controllers/MarkingMarkingScheme");

router.post("/", isAuth, createMarkingMarkingScheme);
router.get("/views/", isAuth, getAllMarkingMarkingSchemes);
router.get("/view/:id", isAuth, getMarkingMarkingScheme);
router.get("/view/group/:id", isAuth, getMarkingMarkingSchemeByGroupId);
router.get("/group/:id", isAuth, getGroupByGroupId);
router.get("/submission/all", isAuth, getAllDocumentUpload);
router.get("/submission/user/:id", isAuth, getDocumentUploadByUserId);
router.get("/submission/upload/:id", isAuth, getSubmissionById);

module.exports = router;
