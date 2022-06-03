const Panel = require('../Models/Panel')
const AddPanel = require('../Models/AddPanel')
const studentGroup = require('../Models/StudentGroup');

exports.createPanel = (req, res) => {
 const panel = new Panel(req.body);
 panel.save((err, data) => {
  if (err) {
   return res.status(400).json({
    error: String(err),
   });
  } else {
   res.json({ data });
  }
 });
};

exports.getAllPanels = (req, res) => {
 Panel.find().populate("panelHead").populate("firstPanelMember").populate("secondPanelMember").populate("thirdPanelMember").exec((err, result) => {
  if (err) {
   return res.status(400).json({
    error: String(err),
   });
  }
  res.json(result);
 });
}

exports.addPanel = (req, res) => {
 const addPanel = new AddPanel(req.body);
 addPanel.save((err, data) => {
  if (err) {
   return res.status(400).json({
    error: String(err),
   });
  } else {
   res.json({ data });
  }
 });
};

exports.getAllAddPanels = (req, res) => {
 AddPanel.find().populate("groupId").populate("blindReviwer").populate("panelId").exec((err, result) => {
  if (err) {
   return res.status(400).json({
    error: String(err),
   });
  }
  res.json(result);
 });
}

exports.getNotaddedPanels = async (req, res) => {
 try {
  const groups = await studentGroup.find()
  let ob = []
  for (let i = 0; i < groups.length; i++) {
   let panel = await AddPanel.findOne({ groupId: groups[i]._id })
   if (panel) {

   } else {
    let newOb = {
     groupId: groups[i]._id,
     groupName: groups[i].groupName,
    }
    ob.push(newOb)
   }
  }
  res.send(ob)
 } catch (error) {
  res.status(505).send({ status: "error in fetching", error: error.message });
 }
}

exports.getPanelsByUserId = async (req, res) => {
 try {
  const panels = await Panel.find()
  let ob = []
  for (let i = 0; i < panels.length; i++) {
   if (panels[i].panelHead == req.params.id) {
    let newOb = {
     panelId: panels[i]._id,
     panelName: panels[i].panelName,
     position: "Panel Head",
    }
    ob.push(newOb);
   } else if (panels[i].firstPanelMember == req.params.id) {
    let newOb = {
     panelId: panels[i]._id,
     panelName: panels[i].panelName,
     position: "First Panel Member",
    }
    ob.push(newOb);
   } else if (panels[i].secondPanelMember == req.params.id) {
    let newOb = {
     panelId: panels[i]._id,
     panelName: panels[i].panelName,
     position: "Second Panel Member",
    }
    ob.push(newOb);
   } else if (panels[i].thirdPanelMember == req.params.id) {
    let newOb = {
     panelId: panels[i]._id,
     panelName: panels[i].panelName,
     position: "Third Panel Member",
    }
    ob.push(newOb);
   }
  }
  res.send(ob)
 } catch (error) {
  res.status(505).send({ status: "error in fetching", error: error.message });
 }
}

exports.getAddPanelsByUserId = (req, res) => {
 AddPanel.find({
  blindReviwer: req.params.id
 }).populate("groupId").populate("blindReviwer").populate("panelId").exec((err, result) => {
  if (err) {
   return res.status(400).json({
    error: String(err),
   });
  }
  res.json(result);
 });
}

exports.getAddPanelsByPanelId = (req, res) => {
 AddPanel.find({
  panelId: req.params.id
 }).populate("groupId").populate("panelId").exec((err, result) => {
  if (err) {
   return res.status(400).json({
    error: String(err),
   });
  }
  res.json(result);
 });
}
exports.getPanelsByPanelId = (req, res) => {
 Panel.findById({
  _id: req.params.id
 }).populate("panelHead").populate("firstPanelMember").populate("secondPanelMember").populate("thirdPanelMember").exec((err, result) => {
  if (err) {
   return res.status(400).json({
    error: String(err),
   });
  }
  res.json(result);
 });
}