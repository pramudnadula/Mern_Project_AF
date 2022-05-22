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
