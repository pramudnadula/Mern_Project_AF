const mongoose = require("mongoose");

const markingSchemeModel = new mongoose.Schema({
  name: { type: String },
  features: [
    {
      feature: String,
      marks: Number,
    },
  ],
  total: { type: Number },
});
const markingScheme = mongoose.model("MarkingScheme", markingSchemeModel);
module.exports = markingScheme;
