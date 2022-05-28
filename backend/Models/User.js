const mongoose = require('mongoose');
var ObjectId = require('bson').ObjectId;
const Schema = mongoose.Schema;

const userSchema = new Schema({

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


    username: {
        type: String,
        required: true

    },


    password: {
        type: String,
        required: true

    },
    groupid: {
        type: ObjectId,
        ref: "studentGroup"
    },

    image: {
        type: String
    }


})

const User = mongoose.model("User", userSchema);

module.exports = User;