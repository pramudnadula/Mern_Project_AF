const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../util/sendEmail");
// import sendMail from "../util/sendEmail";

const User = require("../Models/User");
const supervisor = require('../Models/Supervisor')

//add student
exports.signup = async (req, res, next) => {

    const email = req.body.email;
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const type = req.body.type;
    const password = req.body.password;
    try {
        const checkuser = await User.findOne({ email: email });
        if (checkuser) {
            const error = new Error("Email exsisted");
            error.statusCode = 500;
            throw error;
        }
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPw,
            username: username,
            fname: fname,
            lname: lname,
            type: type,
        });
        const result = await user.save();
        res.status(201).json({ message: "User created!", userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};



//update student
exports.update = async (req, res, next) => {

    let userID = req.params.userId;
    const { fname, lname, email, type, username, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);

    const updateUser = {
        fname,
        lname,
        email,
        type,
        username,
        password: hashedPw,
    };

    const update = await User.findByIdAndUpdate(userID, updateUser)
        .then(() => {
            res.status(200).send({ status: 'User Updated' });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .send({ status: 'Error with updating data' });
        });
};

//reset password
exports.passowrdReset = async (req, res, next) => {

    let email = req.body.email;
    let user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        user = await supervisor.findOne({ email })
        if (!user) {
            res.send({ sta: false });
        }
        else {
            console.log(email);
            const token = user._id.toString();
            const test = sendMail(email, token);

            res.send({ sta: true })
        }
    } else {
        console.log(email);
        const token = user._id.toString();
        const test = sendMail(email, token);

        res.send({ sta: true })
    }

    // const { fname, lname, email, type, username, password } = req.body;
    // const hashedPw = await bcrypt.hash(password, 12);

    // const updateUser = {
    //     fname,
    //     lname,
    //     email,
    //     type,
    //     username,
    //     password: hashedPw,
    // };

    // const update = await User.findByIdAndUpdate(userID, updateUser)
    //     .then(() => {
    //         res.status(200).send({ status: 'User Updated' });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res
    //             .status(500)
    //             .send({ status: 'Error with updating data', error: message });
    //     });
};

//get one user 
exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate("groupid");
        if (!user) {
            const error = new Error("Could not find user.");
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

//login check validations
exports.login = async (req, res, next) => {
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
        const user = await User.findOne(filter);
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
                type: user.type,
                userId: user._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "10h" },
        );
        let gid;
        if (!user.groupid) {
            gid = ""
        } else {
            gid = user.groupid
        }

        res.status(200).json({ token: token, userId: user._id.toString(), gid });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};



//delete student
exports.delete = async (req, res, next) => {

    //router.route("/delete/:id").delete(async (req,res) =>{
    let id = req.params.id;


    await User.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({ status: "User deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with delete user", error: err.message });
        });
};


exports.getstudents = async (req, res, next) => {
    let gid = req.params.id;

    await User.find({ groupid: gid }).then((users) => {

        res.send(users)
    }).catch((err) => {
        res
            .status(500)
            .send({ status: "Error", error: err.message });
    })
};


exports.notassigendstudents = async (req, res, next) => {


    await User.find({ groupid: null }).then((users) => {

        res.send(users)

    }).catch((err) => {

        res
            .status(500)
            .send({ status: "Error", error: err.message });
    })
};



// get all students by admin
exports.getallstudents = async (req, res) => {

    await User.find().then((users) => {
        res.json(users)


    }).catch((error) => {
        res.status(400).json({
            error: String(err)

        })
    })

}

//add student by admin
exports.add = async (req, res, next) => {

    const email = req.body.email;
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const password = req.body.password;
    try {
        const checkuser = await User.findOne({ email: email });
        if (checkuser) {
            const error = new Error("Email exsisted");
            error.statusCode = 500;
            throw error;
        }
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPw,
            username: username,
            fname: fname,
            lname: lname

        });
        const result = await user.save();
        res.status(201).json({ message: "User created!", userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.getallusers = async (req, res) => {

    await User.find().then((users) => {
        res.json(users)
    }).catch((error) => {
        res.status(400).json({
            error: String(err)

        })
    })

}


//update student profile by admin
exports.edit = async (req, res, next) => {

    let userID = req.params.userId;
    const { fname, lname, email, type, username, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);
    console.log(userID)
    const updateUser = {
        fname,
        lname,
        email,
        username,
        password: hashedPw,
    };

    const update = await User.findByIdAndUpdate(userID, updateUser)
        .then(() => {
            res.status(200).send({ status: 'User Updated' });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .send({ status: 'Error with updating data' });
        });
};

exports.changePassword = async (req, res) => {
    try {
        const { uid, password } = req.body
        let user = await User.findById({ _id: uid })
        if (!user) {
            user = await supervisor.findById({ _id: uid })
            const hashedPw = await bcrypt.hash(password, 12);
            user.password = hashedPw
            await user.save()
        }
        else {
            const hashedPw = await bcrypt.hash(password, 12);
            user.password = hashedPw
            await user.save()
        }
        res.send({ stat: true })

    } catch (error) {
        res.status(400).json({
            error: String(error)

        })
    }
}
