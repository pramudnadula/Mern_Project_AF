const mongoose = require("mongoose");

const markingSchemeModel = new mongoose.Schema({
  name: { type: String },
  submissionType: { type: String, ref: "SubmissionType" },
  fullAllocatedMarks: { type: Number },
  creator: { type: String },
  features: [
    {
      criterion: String,
      allocatedMark: Number,
    },
  ],
});
const markingScheme = mongoose.model("MarkingScheme", markingSchemeModel);
module.exports = markingScheme;
