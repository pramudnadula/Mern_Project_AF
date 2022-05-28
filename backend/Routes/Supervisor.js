const router = require('express').Router();
const { listbysearch, addSupervisor, getSupervisor, loginSupervisor, updateSupervisor } = require('../Controllers/Supervisor');


router.post('/supervisors', addSupervisor)
router.post('/supervisors/by/search', listbysearch)

router.post('/supervisors/login', loginSupervisor)

// get one 
router.get("/supervisors/:staffId", getSupervisor);

router.put("/supervisors/update/:staffId", updateSupervisor);

module.exports = router;