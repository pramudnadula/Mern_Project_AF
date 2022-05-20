const mongoose = require('mongoose')
const ResearchAreaSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }

}, { timestamps: true })

const ResearchArea = mongoose.model("researcharea", ResearchAreaSchema);
module.exports = ResearchArea;