const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../Models/Admin");


//login check validatons
exports.loginAdmin = async (req, res, next) => {
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
        const user = await Admin.findOne(filter);
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
                userId: user._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "10h" },
        );


        res.status(200).json({ message: "user fetched.", token: token, userId: user._id.toString() });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};