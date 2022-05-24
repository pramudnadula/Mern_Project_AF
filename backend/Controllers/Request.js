const Request = require('../Models/Request')
const User = require('../Models/User')
const Conversation = require('../Models/Conversation')
const Supervisor = require('../Models/Supervisor');
const Group = require('../Models/StudentGroup')
exports.addrequest = async (req, res) => {
    const newrequest = new Request(req.body)
    await newrequest.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "error"
            })
        }
        res.send("added")
    })

}

exports.getspecificrequest = async (req, res) => {
    let userID = req.params.id;
    await Request.find({ reciever: userID }).populate("group").then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).json({
            error: "error"
        })
    })
}

exports.requestresponse = async (req, res) => {
    const { sta, gid, uid, rid } = req.body
    try {
        if (sta) {
            const mems = await User.find({ groupid: gid })
            const user = await User.findById({ _id: uid })
            for (var i = 0; i < mems.length; i++) {
                const newcon = new Conversation({
                    members: [uid, mems[i]._id.toString()],
                    names: [user.fname, mems[i].fname],
                    type: 1,
                    gid
                })
                await newcon.save()
            }

            user.groupid = gid;
            await user.save()
            await Request.findByIdAndDelete({ _id: rid })


        } else {
            await Request.findByIdAndDelete({ _id: rid })
        }
        res.send("ok")
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: "errors"
        })
    }
}


exports.requestresponsesupervisor = async (req, res) => {
    const { sta, gid, uid, rid } = req.body
    try {
        if (sta) {
            const user = await Supervisor.findById({ _id: uid })
            let sup;
            const group = await Group.findById({ _id: gid }).populate("cosupervisor").populate("supervisor")
            if (user.isSupervisor) {
                sup = true;
                if (group.cosupervisor) {
                    const newcon = new Conversation({
                        members: [uid, group.cosupervisor._id.toString()],
                        names: [user.fname, group.cosupervisor.fname],
                        type: 3,
                        gid
                    })
                    await newcon.save()
                }
            } else {
                sup = false;
                if (group.supervisor) {
                    const newcon = new Conversation({
                        members: [uid, group.supervisor._id.toString()],
                        names: [user.fname, group.supervisor.fname],
                        type: 3,
                        gid
                    })
                    await newcon.save()
                }
            }
            const mems = await User.find({ groupid: gid })

            for (var i = 0; i < mems.length; i++) {
                const newcon = new Conversation({
                    members: [uid, mems[i]._id.toString()],
                    names: [user.fname, mems[i].fname],
                    type: 2,
                    gid
                })
                await newcon.save()
            }
            if (sup) {
                group.supervisor = uid;
            }
            else {
                group.cosupervisor = uid;
            }
            user.groups = user.groups + 1;
            await user.save()
            await group.save()
            await Request.findByIdAndDelete({ _id: rid })


        } else {
            await Request.findByIdAndDelete({ _id: rid })
        }
        res.send("ok")
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: "errors"
        })
    }
}

