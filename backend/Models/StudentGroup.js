const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;

const studentGroupModel = new mongoose.Schema({
    topic: { type: String },
    groupName: { type: String },
    supervisor: {
        type: ObjectId,
        ref: 'supervisor'
    },
    cosupervisor: {
        type: ObjectId,
        ref: 'supervisor'
    },
    members: [{ type: ObjectId, ref: 'student' }],
    area: {
        type: ObjectId,
        ref: "researcharea"
    }

}, { timestamps: true })

const studentGroup = mongoose.model("studentGroup", studentGroupModel);
module.exports = studentGroup;