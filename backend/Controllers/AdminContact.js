const Contact = require('../Models/AdminContact')

exports.addconatact = async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.save()
        res.send({ sta: true })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getMycontactQuestions = async (req, res) => {
    try {
        const userid = req.body.uid
        const contacts = await Contact.find({ uid: userid })

        res.send(contacts)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deletecontact = async (req, res) => {
    const id = req.body.id
    try {
        await Contact.findByIdAndDelete({ _id: id })
        res.send({ msg: "success" })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getallContacts = async (req, res) => {
    try {
        const questions = await Contact.find()
        res.send(questions)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.addReplay = async (req, res) => {
    try {
        const { reply, cid } = req.body
        let contatc = await Contact.findById({ _id: cid })
        contatc.reply = reply
        await contatc.save()
        res.send({ sta: true })
    } catch (error) {
        res.status(500).json(error)
    }
}