const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Conversationschema = new schema({

    members: {
        type: Array,
    },
    receiver: {
        type: String
    },

}, { timestamps: true })

const Conversation = mongoose.model("conversation", Conversationschema);
module.exports = Conversation;