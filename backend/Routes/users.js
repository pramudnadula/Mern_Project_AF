const router = require('express').Router();
const authController = require("../Controllers/user");
const isAuth = require("../middleware/auth");//pass the middleware

const multer = require('multer')
const path = require("path");
const User = require('../Models/User')
const fs = require('fs')


router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.put("/update/:userId", isAuth, authController.update);
router.post("/resetpassword", authController.passowrdReset);
router.post("/changepassword", authController.changePassword);
router.post("/add", authController.add);
router.put("/edit/:userId", isAuth, authController.edit);

// get one user for update
router.get("/getuser/:userId", isAuth, authController.getUser);
router.get("/all", isAuth, authController.getallstudents);
//router.get("/all", isAuth, authController.getallusers);


router.delete("/delete/:id", isAuth, authController.delete);
router.get("/getstudnets/:id", isAuth, authController.getstudents);
router.get("/getnotassigend", isAuth, authController.notassigendstudents);

//upload profile image
const storages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({ storage: storages })


router.post("/profileimage", upload.single('proimage'), async (req, res) => {
    try {
        console.log(req.file);
        const user = await User.findById({ _id: req.body.uid })
        user.image = req.file.path
        await user.save()
        res.send("Single File Upload Success")
    }
    catch (err) {
        res.send("Single File Upload fail")
    }
})


module.exports = router;