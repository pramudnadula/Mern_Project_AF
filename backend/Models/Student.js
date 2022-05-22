const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;

const studentModel = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    group: {
        type: ObjectId,
        ref: "studentGroup",
        default: null
    },



}, { timestamps: true })

const student = mongoose.model("stud", studentModel);
module.exports = student;