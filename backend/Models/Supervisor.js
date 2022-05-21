
const mongoose = require('mongoose');
var ObjectId = require('bson').ObjectId;

const Schema = mongoose.Schema;

const supervisorSchema = new Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true

    },

    area: [{ type: ObjectId, ref: 'researcharea' }],
    groups: {
        type: Number
    },
    isSupervisor: {
        type: Boolean
    },

    username: {
        type: String,
        required: true

    },

    password: {
        type: String,
        required: true

    }


})

const Supervisor = mongoose.model("Supervisor", supervisorSchema);

module.exports = Supervisor;
