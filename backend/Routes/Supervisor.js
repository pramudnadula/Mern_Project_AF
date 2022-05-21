const router = require('express').Router();
const { listbysearch, addSupervisor } = require('../Controllers/Supervisor');

router.post('/supervisors', addSupervisor)
router.post('/supervisors/by/search', listbysearch)

module.exports = router;