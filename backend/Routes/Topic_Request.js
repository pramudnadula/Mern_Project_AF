const { addrequest, checkForRequess, checkbyuser, responsefromstaff } = require('../Controllers/Topic_Request');

const router = require('express').Router();


router.post('/', addrequest)
router.get('/check/:gid', checkForRequess)
router.post('/checkbyuser/:uid', checkbyuser)
router.post('/response', responsefromstaff)


module.exports = router;