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
        const contacts = Contact.find({ uid: userid })
        res.send(contacts)
    } catch (error) {
        res.status(500).json(error)
    }
}