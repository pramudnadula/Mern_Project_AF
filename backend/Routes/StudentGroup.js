const router = require('express').Router();
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { creategroup, getstudentgroup, addmember, existmember, getallocatedgroups, getgroupstage, getmarksforGraph, gethomeanalytics, getMaxmarkGroup } = require('../Controllers/StudentGroup');
const studentGroup = require('../Models/StudentGroup');
const User = require('../Models/User')
const Stage = require('../Models/Groupstage')
const isAuth = require("../middleware/auth");//pass the middleware
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false)
    }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

router.route("/").post(upload.single('studentImage'), isAuth, async (req, res) => {
    const uid = req.body.uid
    const groupName = req.body.name;
    const image = req.file?.path;

    const user = await User.findById({ _id: uid })


    const newgroup = new studentGroup({
        groupName,
        image,
        members: 1
    })
    let nstage = new Stage({
        group: newgroup._id,
        stage: 1
    })

    await nstage.save()
    user.groupid = newgroup._id;
    await user.save()
    newgroup.save().then(() => {

        res.json({ gid: newgroup._id });

    }).catch(function (err) {
        console.log(err);
    })
})




router.get("/:id", isAuth, getstudentgroup);
router.get("/:id/add/:sid", isAuth, addmember);
router.get("/:id/isexist/:sid", isAuth, existmember);
router.get("/groups/:sid", isAuth, getallocatedgroups);
router.get("/groupstage/:gid", isAuth, getgroupstage);
router.post("/marks", isAuth, getmarksforGraph);
router.post("/analytics", isAuth, gethomeanalytics);
router.post("/maxmarkgroup", isAuth, getMaxmarkGroup);

module.exports = router;