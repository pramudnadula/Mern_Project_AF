const MarkingMarkingScheme = require("../Models/MarkingMarkingScheme");
const StudentGroup = require("../Models/StudentGroup");

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
  MarkingMarkingScheme.find().exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: String(err),
      });
    }
    res.json(result);
  });
  // try {
  //   const markingMarkingScheme = await MarkingMarkingScheme.findById({
  //     _id: "6298777d68cc6cbdd3eb042a",
  //   });

  //   res.status(200).json(markingMarkingScheme);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
};
