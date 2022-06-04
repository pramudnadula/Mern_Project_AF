const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;
const QuestionSchema = new mongoose.Schema({
    uid: {
        type: ObjectId,
        ref: "User"
    },
    question: {
        type: String
    },
    replys: [{
        type: ObjectId,
        ref: "question"
    }]

}, { timestamps: true })

const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;