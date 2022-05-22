const mongoose = require("mongoose");
var ObjectId = require("bson").ObjectId;
const markingMarkingSchemeModel = new mongoose.Schema({
  markingSchemeId: { type: ObjectId, ref: "MarkingScheme" },
  groupId: { type: ObjectId, ref: "studentGroup" },
  individualMark: [{ type: Number }],
  totalMarks: { type: Number },
  remark: { type: String },
});
const markingMarkingScheme = mongoose.model(
  "MarkingMarkingScheme",
  markingMarkingSchemeModel
);
module.exports = markingMarkingScheme;