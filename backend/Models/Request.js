const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;
const RequestSchema = new mongoose.Schema({
    group: {
        type: ObjectId,
        ref: "studentGroup"
    },
    reciever: {
        type: ObjectId,
        ref: "stud"

    }

}, { timestamps: true })

const Request = mongoose.model("request", RequestSchema);
module.exports = Request;