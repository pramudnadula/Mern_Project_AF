const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;
const AdminContactAreaSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    uid: {
        type: String,


    },
    email: {
        type: String,
    },
    subject: {
        type: String
    },
    question: {
        type: String
    },
    utype: {
        type: String
    },
    reply: {
        type: String
    }


}, { timestamps: true })

const Acontact = mongoose.model("admincontact", AdminContactAreaSchema);
module.exports = Acontact;