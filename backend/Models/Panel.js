const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;

const PanelModel = new mongoose.Schema({
 panelHead: { type: ObjectId, ref: "Supervisor" },
 firstPanelMember: { type: ObjectId, ref: "Supervisor" },
 secondPanelMember: { type: ObjectId, ref: "Supervisor" },
 thirdPanelMember: { type: ObjectId, ref: "Supervisor" },
 panelName: { type: String },
})

const Panel = mongoose.model("Panel", PanelModel);
module.exports = Panel;