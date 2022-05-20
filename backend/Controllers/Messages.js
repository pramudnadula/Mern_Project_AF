const Message = require("../Models/Message");

exports.addmessage = async (req, res) => {
    const newMassage = new Message(req.body)
    try {
        const newm = await newMassage.save()
        res.status(200).json(newm)
    } catch (error) {
        res.status(500).json(err)
    }
}

exports.getmessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,

        })
        res.status(200).json(messages)

    } catch (error) {
        res.status(500).json(err)
    }
}