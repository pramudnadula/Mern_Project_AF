const mongoose = require('mongoose');
var ObjectId = require('bson').ObjectId;
const Schema = mongoose.Schema;

const adminSchema = new Schema({


    email: {
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

    image: {
        type: String
    }


})

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;