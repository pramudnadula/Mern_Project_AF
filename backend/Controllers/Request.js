const Request = require('../Models/Request')
const User = require('../Models/User')
const Conversation = require('../Models/Conversation')
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
    await Request.find({ reciever: userID }).then((data) => {
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
                    names: [user.fname, mems[i].fname]
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