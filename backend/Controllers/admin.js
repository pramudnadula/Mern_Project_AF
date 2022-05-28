const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../Models/Admin");


//login check validatons
exports.login = async (req, res, next) => {
    //const email = req.body.email;

    try {
        const { email, password } = req.body
        const user = await Admin.findOne({ email, password })

        if (user) {
            res.send(user);
        }
        else {
            res.status(500).send({ status: "invaild login", error: "invalid login" });
        }

    } catch (err) {
        res.status(500).send({ status: "error", error: err.message });
    }
};






