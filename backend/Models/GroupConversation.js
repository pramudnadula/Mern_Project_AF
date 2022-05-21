const mongoose = require('mongoose');
const schema = mongoose.Schema;
const GroupConversationschema = new schema({

    members: {
        type: Array,
    },
    group: {
        type: String
    },


}, { timestamps: true })

const GroupConversation = mongoose.model("groupconversation", GroupConversationschema);
module.exports = GroupConversation;