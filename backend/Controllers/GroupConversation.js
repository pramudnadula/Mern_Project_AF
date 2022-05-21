const GroupConversation = require('../Models/GroupConversation')

exports.createGroupchat = async (req, res) => {
    const newcon = new GroupConversation({
        group: req.body.gid,
        $push: { members: req.body.memid }
    })
    try {
        const savedconversation = await newcon.save()
        res.status(200).json(savedconversation)
    } catch (error) {
        res.status(500).json(err)
    }
}