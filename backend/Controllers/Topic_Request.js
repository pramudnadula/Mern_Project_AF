const TopicRequest = require('../Models/Topic_Request')
const Topic = require('../Models/Topic')
const ResearchArea = require('../Models/ResearchArea')
const Group = require('../Models/StudentGroup')
var ObjectId = require('bson').ObjectId;
exports.addrequest = async (req, res) => {
    try {

        let area = await ResearchArea.findById({ _id: req.body.areas })

        let topic = new Topic({
            group: req.body.gid,
            name: req.body.name,
            areas: req.body.areas,
            links: req.body.links,
            rname: area.name,
            sstat: false,
            cstat: false,
            sview: false,
            cview: false
        })

        await topic.save()

        let treq = new TopicRequest({
            group: req.body.gid,
            sup: req.body.sid,
            co: req.body.cid,
            topic: topic._id
        })

        await treq.save()
        res.send({ msg: "success" })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}


exports.checkForRequess = async (req, res) => {
    try {
        const gid = req.params.gid
        const request = await TopicRequest.findOne({ group: gid })
        res.json(request)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.checkbyuser = async (req, res) => {
    try {
        let { type } = req.body
        const uid = req.params.uid
        let reqs

        if (type) {

            reqs = await TopicRequest.find({ sup: uid }).populate("topic")
        }
        else {

            reqs = await TopicRequest.find({ co: uid }).populate("topic")
        }

        res.send(reqs)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.responsefromstaff = async (req, res) => {
    const { stat, type, tid, rid } = req.body
    try {
        let re
        re = await Topic.findById({ _id: tid })
        if (type) {

            re.sstat = stat
            re.sview = true
            await re.save()

            if (re.cview) {
                if (re.cstat) {
                    if (stat) {

                        let group = await Group.findById({ _id: re.group })
                        group.topic = re.name
                        group.area = re.areas
                        await group.save()
                        await Topic.findByIdAndDelete({ _id: re._id })
                        await TopicRequest.findByIdAndDelete({ _id: rid })
                    } else {
                        await Topic.findByIdAndDelete({ _id: re._id })
                        await TopicRequest.findByIdAndDelete({ _id: rid })
                    }

                } else {
                    await Topic.findByIdAndDelete({ _id: re._id })
                    await TopicRequest.findByIdAndDelete({ _id: rid })
                }
            }
        }
        else {
            re.cstat = stat
            re.cview = true
            await re.save()

            if (re.sview) {
                if (re.sstat) {
                    if (stat) {

                        let group = await Group.findById({ _id: re.group })
                        group.topic = re.name
                        console.log(group)
                        await group.save()
                        await Topic.findByIdAndDelete({ _id: re._id })
                        await TopicRequest.findByIdAndDelete({ _id: rid })
                    } else {
                        await Topic.findByIdAndDelete({ _id: re._id })
                        await TopicRequest.findByIdAndDelete({ _id: rid })
                    }

                } else {
                    await Topic.findByIdAndDelete({ _id: re._id })
                    await TopicRequest.findByIdAndDelete({ _id: rid })
                }
            }
        }
        res.send({ msg: "success" })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}