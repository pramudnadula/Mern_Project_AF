const studentGroup = require('../Models/StudentGroup');
const Supervisor = require('../Models/Supervisor')
const Stage = require('../Models/Groupstage')
//create new student group
exports.creategroup = async (req, res) => {

    try {
        const group = new studentGroup(req.body)
        await group.save()
        let nstage = new Stage()
        nstage = {
            group: group._id,
            stage: 1
        }
        await nstage.save()
        res.json({ data })
    } catch (err) {
        res.status(500).send({ status: "error in fetching", error: err.message });
    }


}

//get a student group
exports.getstudentgroup = async (req, res) => {
    let groupid = req.params.id;
    const thestudent = await studentGroup.findById(groupid).populate("supervisor").populate("cosupervisor").then((group) => {
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

exports.getallocatedgroups = async (req, res) => {
    let sid = req.params.sid;
    const stff = await Supervisor.findById({ _id: sid })
    if (stff.isSupervisor) {
        const groups = await studentGroup.find({ supervisor: sid }).populate("area").then((group) => {
            res.json(group);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "error in fetching", error: err.message });
        })
    }
    else {
        const groups = await studentGroup.find({ cosupervisor: sid }).populate("area").then((group) => {
            res.json(group);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "error in fetching", error: err.message });
        })
    }

}

exports.getgroupstage = async (req, res) => {
    let gid = req.params.gid;
    try {
        const stage = await Stage.findOne({ group: gid })
        res.send(stage)
    } catch (e) {
        res.status(500).send({ status: "error in fetching", error: err.message });
    }
}