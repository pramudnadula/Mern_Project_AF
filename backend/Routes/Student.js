
const Student = require('../Models/Student')
const router = require('express').Router();

router.get('/stu/all', (req, res) => {
    Student.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
})

router.post('/stu/add', (req, res) => {
    const area = new Student(req.body)
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
})

router.get('/stu/notassigned', (req, res) => {
    Student.find({ group: null }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
})

router.get('/stu/get/:id', (req, res) => {
    const id = req.params.id;
    Student.find({ _id: id }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
})



module.exports = router;