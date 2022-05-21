const User = require('../Models/Supervisor')
var ObjectId = require('bson').ObjectId;
//method that used to filter supervisors according to user selection
exports.listbysearch = (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    var limit
    if (req.body.limit) {
        limit = parseInt(req.body.limit)
    } else {
        limit = 100
    }
    const isSupervisor = req.body.isSupervisor;
    let skip = parseInt(req.body.skip)
    var ind = 0;
    let findArgs = {}
    findArgs["isSupervisor"] = isSupervisor;


    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'groups') {

                findArgs[key] = {
                    $gt: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                let arr = []
                arr = req.body.filters["area"];

                findArgs["area"] = {
                    $in: arr
                }






                // findArgs1 = {
                //     area: req.body.filters[key]
                // }
            }
        }
    }


    User.find(findArgs)

        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: String(err)
                })
            }
            res.json({
                size: data.length,
                data
            })
        })
}

//method that use to add new supervisor
exports.addSupervisor = (req, res) => {
    const supervisor = new User(req.body)
    supervisor.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "supervisor allready Exists"
            })
        }
        else {
            res.json({ data })
        }
    })
}