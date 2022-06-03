const mongoose = require('mongoose')
var ObjectId = require('bson').ObjectId;

const AddPanelModel = new mongoose.Schema({
 groupId: { type: ObjectId, ref: "studentGroup" },
 blindReviwer: { type: ObjectId, ref: "Supervisor" },
 panelId: { type: ObjectId, ref: "Panel" },
})

const AddPanel = mongoose.model("AddPanel", AddPanelModel);
module.exports = AddPanel;