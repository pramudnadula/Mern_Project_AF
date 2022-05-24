const router = require('express').Router();
const { listbysearch, addSupervisor, getSupervisor, loginSupervisor } = require('../Controllers/Supervisor');

router.post('/supervisors', addSupervisor)
router.post('/supervisors/by/search', listbysearch)

router.post('/supervisors/login', loginSupervisor)

// get one 
router.get("/supervisors/:staffId", getSupervisor);



module.exports = router;