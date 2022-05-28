const Supervisor = require('../Models/Supervisor');
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
    console.log(req.body)
    const supervisor = new Supervisor(req.body)
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



//get one user 
exports.getSupervisor = async (req, res, next) => {
    const staffId = req.params.staffId;

    try {
        const user = await Supervisor.findById(staffId);

        if (!user) {
            const error = new Error("Could not find supervisor");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "user fetched.", user: user });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//login
exports.loginSupervisor = async (req, res, next) => {
    const { email, password } = req.body
    console.log(email)
    console.log(password)



    try {
        const user = await Supervisor.find({ email, password });
        console.log(user)
        if (!user) {
            const error = new Error("Could not find supervisor");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "user fetched.", UId: user[0]._id.toString(), type: user[0].isSupervisor });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


//update Supervisor
exports.updateSupervisor = async (req, res, next) => {

    let staffID = req.params.staffId;
    const { fname, lname, email, area, username, password } = req.body;
    // const hashedPw = await bcrypt.hash(password, 12);

    const updateSupervisor = {
        fname,
        lname,
        email,
        area,
        username,
        password,
        // password: hashedPw,
    };

    const update = await Supervisor.findByIdAndUpdate(staffID, updateSupervisor)
        .then(() => {
            res.status(200).send({ status: 'Supervisor Updated' });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .send({ status: 'Error with updating data', error: message });
        });
};
