const router = require('express').Router();
const authController = require("../Controllers/user");

const multer = require('multer')
const path = require("path");
const User = require('../Models/User')
const fs = require('fs')


router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.put("/update/:userId", authController.update);

// get one user for update
router.get("/getuser/:userId", authController.getUser);

router.delete("/delete/:userId", authController.delete);
router.get("/getstudnets/:id", authController.getstudents);
router.get("/getnotassigend", authController.notassigendstudents);

//upload image
const storages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({ storage: storages })


router.post("/profileimage", upload.single('proimage'), (req, res) => {
    console.log(req.file);
    res.send("Single File Upload Success")
})
// const filefilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false)
//     }
// };

// const upload = multer({ storage: storage, fileFilter: filefilter });
// router.route("/upload").post(upload.single('studentImage'), (req, res) => {

//     const image = req.file?.path;

//     const newuserimg = new User({

//         image,
//     })

//     newuserimg.save().then(() => {
//         res.json("image added");
//     }).catch(function (err) {
//         // console.log(err);
//     })
// })



module.exports = router;