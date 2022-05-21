const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Messageschema = new schema({

    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
}, { timestamps: true })

const Message = mongoose.model("msg", Messageschema);
module.exports = Message;