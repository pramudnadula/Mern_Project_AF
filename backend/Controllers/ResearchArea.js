const ResearchArea = require('../Models/ResearchArea')

exports.allAreas = (req, res) => {
    ResearchArea.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
}

exports.createarea = (req, res) => {
    const area = new ResearchArea(req.body)
    area.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "ResearchArea allready Exists"
            })
        }
        else {
            res.json({ data })
        }
    })
}