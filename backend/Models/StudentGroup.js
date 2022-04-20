const mongoose = require('mongoose')
const schema = mongoose.Schema;

const studentGroupModel = ({
    topic: { type: String },
    groupName: { type: String }
}, { timestamps: true })

const studentGroup = mongoose.model("studentGroup", studentGroupModel);
module.exports = studentGroup;