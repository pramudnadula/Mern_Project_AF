const Stage = require('../Models/Groupstage')

exports.getstage = async (req, res) => {
    const gid = req.params.id;
    try {
        const stage = await Stage.findOne({ group: gid })
        res.json(stage)
    } catch (err) {
        res.status(400).json({
            error: "error"
        })
    }
}