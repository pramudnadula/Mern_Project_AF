const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;

const groupstageModel = new mongoose.Schema({

    group: { type: ObjectId, ref: "studentGroup" },
    stage: { type: Number },
    dates: [{ type: String }]


}, { timestamps: true })

const stage = mongoose.model("stage", groupstageModel);
module.exports = stage;