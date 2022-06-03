const MarkingMarkingScheme = require("../Models/MarkingMarkingScheme");
const StudentGroup = require("../Models/StudentGroup");
const DocumentUpload = require('../Models/SubmissionManagement/DocumentUpload');


exports.createMarkingMarkingScheme = (req, res) => {
  const markingMarkingScheme = new MarkingMarkingScheme(req.body);
  markingMarkingScheme.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: String(err),
      });
    } else {
      res.json({ data });
    }
  });
};

exports.getMarkingMarkingScheme = async (req, res) => {
  try {
    const markingMarkingScheme = await MarkingMarkingScheme.findById({
      _id: req.params.id,
    });
    res.status(200).json(markingMarkingScheme);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMarkingMarkingSchemeByGroupId = async (req, res) => {
  try {
    const markingMarkingScheme = await MarkingMarkingScheme.find({
      groupId: req.params.id,
    }).populate("markingSchemeId");
    res.status(200).json(markingMarkingScheme);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getGroupByGroupId = async (req, res) => {
  try {
    const studentGroup = await StudentGroup.findById({
      _id: req.params.id,
    });
    res.status(200).json(studentGroup);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getAllMarkingMarkingSchemes = (req, res) => {
  MarkingMarkingScheme.find().populate("markingSchemeId").populate("groupId").exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: String(err),
      });
    }
    res.json(result);
  });
}

exports.getAllDocumentUpload = (req, res) => {
  DocumentUpload.find().populate("submissionId").populate("groupId").exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: String(err),
      });
    }
    res.json(result);
  });
}

exports.getDocumentUploadByUserId = async (req, res) => {
  try {
    let id = req.params.id;
    const ob = [];
    const obj = [];
    const groups = await StudentGroup.find()
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].supervisor == id) {
        ob.push(groups[i]._id);
      } else if (groups[i].cosupervisor == id) {
        ob.push(groups[i]._id);
      }
    }
    for (let i = 0; i < ob.length; i++) {
      let documents = await DocumentUpload.find(
        { groupId: ob[i] }
      ).populate("submissionId").populate("groupId")
      if (documents.evoluated == true) {

      } else {
        for (let i = 0; i < documents.length; i++) {
          obj.push(documents[i]);
        }
      }
    }
    res.json(obj);

  } catch (err) {
    res.status(505).send({ status: "error in fetching", error: err.message });
  }
}

exports.getSubmissionById = (req, res) => {
  DocumentUpload.findById({
    _id: req.params.id
  }).populate("submissionId").populate("groupId").exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: String(err),
      });
    }
    res.json(result);
  });
}
