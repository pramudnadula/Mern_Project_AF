const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;
const Topic = new mongoose.Schema({
    group: {
        type: ObjectId,
        ref: "studentGroup"
    },
    name: { type: String },
    areas: { type: ObjectId, ref: "researcharea" },
    links: [{ type: String }],
    sstat: { type: Boolean },
    cstat: { type: Boolean },
    sview: { type: Boolean },
    cview: { type: Boolean }
}, { timestamps: true })

const TopicReq = mongoose.model("topic", Topic);
module.exports = TopicReq;