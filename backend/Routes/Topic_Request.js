const { addrequest, checkForRequess, checkbyuser, responsefromstaff } = require('../Controllers/Topic_Request');
const isAuth = require("../middleware/auth");//pass the middleware

const router = require('express').Router();


router.post('/',isAuth, addrequest)
router.get('/check/:gid',isAuth, checkForRequess)
router.post('/checkbyuser/:uid',isAuth, checkbyuser)
router.post('/response',isAuth, responsefromstaff)


module.exports = router;