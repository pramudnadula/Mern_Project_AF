const Conversation = require("../Models/Conversation");


exports.createConveration = async (req, res) => {
    const newcon = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const savedconversation = await newcon.save()
        res.status(200).json(savedconversation)
    } catch (error) {
        res.status(500).json(err)
    }
}

exports.getConversation = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId] },
        })
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json(err)
    }
}