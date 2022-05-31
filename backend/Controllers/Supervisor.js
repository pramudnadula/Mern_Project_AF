const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
exports.addSupervisor = async (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const password = req.body.password;
    const area = req.body.area;
    const groups = req.body.groups;
    const isSupervisor = req.body.isSupervisor;

    try {
        const checkuser = await Supervisor.findOne({ email: email });
        if (checkuser) {
            const error = new Error("Email exsisted");
            error.statusCode = 500;
            throw error;
        }
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new Supervisor({
            email: email,
            password: hashedPw,
            username: username,
            fname: fname,
            lname: lname,
            area: area,
            groups: groups,
            isSupervisor: isSupervisor,
        });
        const result = await user.save();
        res.status(201).json({ message: "Supervisor created!", userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}



//method that use to get one user 
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

//method that use to login supervisor
exports.loginSupervisor = async (req, res, next) => {
    //const email = req.body.email;
    let filter
    if (req.body.email) {
        filter = { email: req.body.email }
    }
    else {
        filter = { username: req.body.username }
    }


    const password = req.body.password;
    try {
        const user = await Supervisor.findOne(filter);
        if (!user) {
            const error = new Error("A user with this email could not be found.");
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                userId: user._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "10h" },
        );


        res.status(200).json({ message: "user fetched.", token: token, UId: user._id.toString(), type: user.isSupervisor });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


//method that use to update Supervisor
exports.updateSupervisor = async (req, res, next) => {

    let staffID = req.params.staffId;
    const { fname, lname, email, username, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);

    const updateSupervisor = {
        email: email,
        username: username,
        fname: fname,
        lname: lname,
        password: hashedPw,
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


//method that use to  get all supervisors by admin
exports.getallsupervisors = async (req, res) => {

    await Supervisor.find().then((users) => {
        res.json(users)


    }).catch((error) => {
        res.status(400).json({
            error: String(err)

        })
    })

}


//method that use to add new supervisor by admin
exports.addStaff = async (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const password = req.body.password;
    const area = req.body.area;
    const groups = req.body.groups;
    const isSupervisor = req.body.isSupervisor;

    try {
        const checkuser = await Supervisor.findOne({ email: email });
        if (checkuser) {
            const error = new Error("Email exsisted");
            error.statusCode = 500;
            throw error;
        }
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new Supervisor({
            email: email,
            password: hashedPw,
            username: username,
            fname: fname,
            lname: lname,
            area: area,
            groups: groups,
            isSupervisor: isSupervisor,
        });
        const result = await user.save();
        res.status(201).json({ message: "Supervisor created!", userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}



//method that use to edit Supervisor by admin
exports.editSupervisor = async (req, res, next) => {

    let staffID = req.params.staffId;
    const { fname, lname, email, username, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);

    const updateSupervisor = {
        email: email,
        username: username,
        fname: fname,
        lname: lname,
        password: hashedPw,
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


//method that use to delete student by admin
exports.deleteSupervisor = async (req, res, next) => {

    //router.route("/delete/:id").delete(async (req,res) =>{
    let id = req.params.id;


    await Supervisor.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({ status: "Supervisor deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with delete supervisor", error: err.message });
        });
};
