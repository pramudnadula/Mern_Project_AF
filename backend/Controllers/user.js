const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/User");

//add
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



//update
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
                .send({ status: 'Error with updating data', error: message });
        });
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


//login check validatons
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
            { expiresIn: "1h" },
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




exports.delete = async (req, res, next) => {

    //router.route("/delete/:id").delete(async (req,res) =>{
    let userid = req.params.userId;


    await User.findByIdAndDelete(userid)
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
