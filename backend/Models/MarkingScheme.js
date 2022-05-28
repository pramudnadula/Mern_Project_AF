const mongoose = require("mongoose");

const markingSchemeModel = new mongoose.Schema({
  name: { type: String },
  //submissionId:{type:ObjectId, ref:""},
  fullAllocatedMarks: { type: Number },
  creator: { type: String },
  features: [{
    criterion: String,
    allocatedMark: Number,
  }]
});
const markingScheme = mongoose.model("MarkingScheme", markingSchemeModel);
module.exports = markingScheme;
