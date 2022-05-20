const studentGroup = require('../Models/StudentGroup');

//create new student group
exports.creategroup = (req, res) => {
    const group = new studentGroup(req.body)
    group.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "group allready Exists"
            })
        }
        else {
            res.json({ data })
        }
    })
}

//get a student group
exports.getstudentgroup = async (req, res) => {
    let groupid = req.params.id;
    const thestudent = await studentGroup.findById(groupid).then((group) => {
        res.json(group);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}

//add new studnet to a group
exports.addmember = async (req, res) => {

}

exports.existmember = async (req, res) => {
    let groupid = req.params.id;
    let stuid = req.params.sid;
    const group = await studentGroup.find({
        _id: groupid,
        members: {
            $in: [stuid]
        }

    }).then((dat) => {
        if (dat == null) {
            res.status(200).send({ status: "do not exist" })
        }
        else {
            res.status(200).send({ status: " exist" })
        }
    }).catch((err) => {
        res.send({ status: "no no no" })
    })
}