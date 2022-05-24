const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;

const studentGroupModel = new mongoose.Schema({
    topic: { type: String },
    groupName: { type: String },
    supervisor: {
        type: ObjectId,
        ref: 'Supervisor'
    },
    cosupervisor: {
        type: ObjectId,
        ref: 'Supervisor'
    },
    members: [{ type: ObjectId, ref: 'student' }],
    area: {
        type: ObjectId,
        ref: "researcharea"
    },
    image: {
        type: String
    }

}, { timestamps: true })

const studentGroup = mongoose.model("studentGroup", studentGroupModel);
module.exports = studentGroup;