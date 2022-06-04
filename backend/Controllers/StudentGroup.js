const studentGroup = require('../Models/StudentGroup');
const Supervisor = require('../Models/Supervisor')
const Stage = require('../Models/Groupstage')
const MMschema = require('../Models/MarkingMarkingScheme')
const User = require('../Models/User')
const Areas = require('../Models/ResearchArea');


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
        res.json({ nstage })
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

exports.getmarksforGraph = async (req, res) => {
    let { gid } = req.body
    try {
        const schemas = await MMschema.find({ groupId: gid }).populate("markingSchemeId")
        res.send(schemas)
    } catch (err) {
        res.status(500).send({ status: "error in fetching", error: err.message });
    }




}

exports.gethomeanalytics = async (req, res) => {
    try {
        const scount = await User.count()
        const sucount = await Supervisor.count()
        const gcount = await studentGroup.count()
        const acount = await Areas.count()

        const ob = {
            scount,
            sucount,
            gcount,
            acount
        }
        res.send(ob)

    } catch (error) {
        res.status(500).send({ status: "error in fetching", error: error.message });
    }



}


exports.getMaxmarkGroup = async (req, res) => {
    try {
        const group = await MMschema.find().populate("groupId").populate("markingSchemeId").sort({ totalMarks: -1 }).limit(1)
        const students = await User.find({ groupid: group[0].groupId._id })
        res.send({ grp: group, stu: students })
    } catch (error) {
        res.status(500).send({ status: "error in fetching", error: error.message });
    }

}

exports.getallstudentGroups = async (req, res) => {
    try {
        const groups = await studentGroup.find().populate("supervisor").populate("cosupervisor").populate("area")
        let ob = []
        for (let i = 0; i < groups.length; i++) {
            const stu = await User.find({ groupid: groups[i]._id })
            const newob = {
                grp: groups[i],
                stu: stu
            }
            ob.push(newob)
        }

        res.send(ob)

    } catch (error) {
        res.status(505).send({ status: "error in fetching", error: error.message });
    }
}