const mongoose = require('mongoose');
var ObjectId = require('bson').ObjectId;
const schema = mongoose.Schema;
const Conversationschema = new schema({

    members: {
        type: Array,
    },
    receiver: {
        type: String
    },
    names: {
        type: Array,
    },
    type: {
        type: Number
    },
    gid: {
        type: ObjectId,
        ref: "studentGroup"
    }

}, { timestamps: true })

const Conversation = mongoose.model("conversation", Conversationschema);
module.exports = Conversation;