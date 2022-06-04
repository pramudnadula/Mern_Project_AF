const question = require('../Models/Question')

exports.addquestion = async (req, res) => {
    try {
        const newquestion = new question(req.body)
        await newquestion.save()

        res.send({ msg: true })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getallQuestions = async (req, res) => {
    try {
        const questions = await question.find().populate("uid")
        res.send(questions)
    } catch (error) {
        res.status(500).json(error)
    }
}