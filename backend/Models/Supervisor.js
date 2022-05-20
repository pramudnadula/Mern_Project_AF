const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    area: [{ type: ObjectId, ref: 'researcharea' }],
    groups: {
        type: Number
    },
    isSupervisor: {
        type: Boolean
    }
})

const User = mongoose.model("supervisor", UserSchema);
module.exports = User;