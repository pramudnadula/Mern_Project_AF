const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('bson').ObjectId;

const DocumentSchema = new Schema({

    submissionStartDate: {
        type: String,
        required: true
    },
    submissionEndDate: {
        type: String,
        required: true
    },

    submissionType: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true

    },

    description: {
        type: String,
        required: true

    },
    staffID:{
        type: ObjectId,
        ref:"Supervisor",
        required:true
    }

})

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;