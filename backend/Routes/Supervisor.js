const router = require('express').Router();
const { listbysearch, addSupervisor, getSupervisor, loginSupervisor, updateSupervisor } = require('../Controllers/Supervisor');
const isAuth = require("../middleware/auth");//pass the middleware


router.post('/supervisors', addSupervisor)
router.post('/supervisors/by/search', isAuth, listbysearch)

router.post('/supervisors/login', loginSupervisor)

// get one 
router.get("/supervisors/:staffId", isAuth, getSupervisor);

router.put("/supervisors/update/:staffId", isAuth, updateSupervisor);

module.exports = router;