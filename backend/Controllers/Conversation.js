const Conversation = require("../Models/Conversation");
const User = require('../Models/User')
const Message = require('../Models/Message')


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

// exports.gettypecon = async (req, res) => {
//     try {
//         const conversations = await Conversation.find({
//             members: { $in: [req.params.userId] },
//             type: "staff"
//         })
//         res.status(200).json(conversations)
//     } catch (error) {
//         res.status(500).json(err)
//     }
// }


exports.getConversationgroup = async (req, res) => {
    const { gid, uid } = req.body
    try {
        const conversations = await Conversation.find({
            members: { $in: [uid] },
            gid: gid

        })
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.createoutsidecoversation = async (req, res) => {
    try {
        const { sid, rid } = req.body

        const sender = await User.findById({ _id: sid })
        const reciever = await User.findById({ _id: rid })
        const newcon = new Conversation({
            members: [sid, rid],
            names: [sender.fname, reciever.fname],
            img: [sender?.image, reciever?.image],
            gid: null,
            receiver: rid

        })
        await newcon.save()
        const newmsg = new Message({
            conversationId: newcon._id,
            sender: sid,
            text: "Hi " + reciever.fname
        })
        await newmsg.save()
        res.json({ resu: true })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }


}

exports.checksend = async (req, res) => {
    try {
        const { rid, sid } = req.body
        const conversations = await Conversation.find({
            members: { $in: [sid] },
            gid: null

        })
        console.log(conversations)
        let ind = 0
        for (let i = 0; i < conversations.length; i++) {

            if (conversations[i].receiver === rid) {
                console.log("ss")
                ind = 1
                res.send({ resu: false })
            }

        }
        if (ind === 0) {
            res.send({ resu: true })
        }
    } catch (e) {
        res.status(500).json(e)
    }

}