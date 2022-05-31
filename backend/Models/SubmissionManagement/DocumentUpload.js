const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('bson').ObjectId;

const DocumentSchema = new Schema({

    

    submissionId: {
        type: ObjectId,
        ref:"SubmissionType",
        required: true
    },

    groupId: {
        type: ObjectId,
        ref:"studentGroup",
        required: true

    },

    documentName:[{
        
        type: String,
        required: true
    }],
    
    submissionDate:{
        type: String,
        required: true
    }

})

const DocumentUpload = mongoose.model("Document", DocumentSchema);

module.exports = DocumentUpload;