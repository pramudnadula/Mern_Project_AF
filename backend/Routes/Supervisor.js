const router = require('express').Router();
const { listbysearch, addSupervisor, getSupervisor, loginSupervisor, updateSupervisor, getallsupervisors, addStaff, deleteSupervisor, } = require('../Controllers/Supervisor');
const isAuth = require("../middleware/auth");//pass the middleware

const multer = require('multer')
const path = require("path");
const fs = require('fs');
const Supervisor = require('../Models/Supervisor');

router.post('/supervisors', addSupervisor)
router.post('/supervisors/by/search', isAuth, listbysearch)
router.post('/supervisors/login', loginSupervisor)
router.post('/supervisors/add', addStaff)

// get one 
router.get("/supervisors/:staffId", isAuth, getSupervisor);
router.get("/supervisor/all", isAuth, getallsupervisors);

router.put("/supervisors/update/:staffId", isAuth, updateSupervisor);
router.put("/supervisors/edit/:staffId", isAuth, updateSupervisor);
router.delete("/supervisors/delete/:id", isAuth, deleteSupervisor);

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


router.post("/supervisorimage", upload.single('supimage'), async (req, res) => {
    try {
        console.log(req.file);
        const user = await Supervisor.findById({ _id: req.body.sid })
        user.image = req.file.path
        await user.save()
        res.send("Single File Upload Success")
    }
    catch (err) {
        res.send("Single File Upload fail")
    }
})


module.exports = router;