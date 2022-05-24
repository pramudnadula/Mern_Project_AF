const router = require('express').Router();
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { creategroup, getstudentgroup, addmember, existmember, getallocatedgroups } = require('../Controllers/StudentGroup');
const studentGroup = require('../Models/StudentGroup');
const User = require('../Models/User')

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

router.route("/").post(upload.single('studentImage'), async (req, res) => {
    const uid = req.body.uid
    const groupName = req.body.name;
    const image = req.file?.path;

    const user = await User.findById({ _id: uid })


    const newgroup = new studentGroup({
        groupName,
        image
    })
    user.groupid = newgroup._id;
    await user.save()
    newgroup.save().then(() => {

        res.json({ gid: newgroup._id });

    }).catch(function (err) {
        console.log(err);
    })
})




router.get("/:id", getstudentgroup);
router.get("/:id/add/:sid", addmember);
router.get("/:id/isexist/:sid", existmember);
router.get("/groups/:sid", getallocatedgroups);

module.exports = router;