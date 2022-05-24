const MarkingMarkingScheme = require("../Models/MarkingMarkingScheme");

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
