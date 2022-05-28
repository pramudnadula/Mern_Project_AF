const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;
const TopicRequestSchema = new mongoose.Schema({
    group: {
        type: ObjectId,
        ref: "studentGroup"
    },
    sup: {
        type: ObjectId,
        ref: "Supervisor"

    },
    co: {
        type: ObjectId,
        ref: "Supervisor"

    },
    topic: {
        type: ObjectId,
        ref: "topic"
    }



}, { timestamps: true })

const TopicRequest = mongoose.model("topicrequest", TopicRequestSchema);
module.exports = TopicRequest;