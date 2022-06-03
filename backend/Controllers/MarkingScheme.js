const MarkingScheme = require("../Models/MarkingScheme");
const StudentGroup = require("../Models/StudentGroup");

exports.createMarkingScheme = (req, res) => {
  const markingScheme = new MarkingScheme(req.body);
  markingScheme.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: String(err),
      });
    } else {
      res.json({ data });
    }
  });
};

exports.getAllMarkingSchemes = (req, res) => {
  MarkingScheme.find().exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: String(err),
      });
    }
    res.json(result);
  });
};
exports.getMarkingScheme = async (req, res) => {
  try {
    const markingScheme = await MarkingScheme.findById({
      _id: req.params.id,
    });
    res.status(200).json(markingScheme);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMarkingSchemeBySubmissionType = async (req, res) => {
  try {
    const markingScheme = await MarkingScheme.findById({
      submissionType: req.params.id,
    });
    res.status(200).json(markingScheme);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getStudentGroupById = async (req, res) => {
  try {
    const group = await StudentGroup.findById({
      _id: req.params.id,
    });
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
};