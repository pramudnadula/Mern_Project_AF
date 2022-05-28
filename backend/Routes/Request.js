const { addrequest, getspecificrequest, requestresponse, requestresponsesupervisor, checkexistrequest } = require('../Controllers/Request');
const isAuth = require("../middleware/auth");//pass the middleware

const router = require('express').Router();



router.post('/', isAuth, addrequest)
router.get("/all/:id", isAuth, getspecificrequest)
router.get("/reject", isAuth, getspecificrequest)
router.post("/response", isAuth, requestresponse)
router.post("/responsesupervisor", isAuth, requestresponsesupervisor)
router.post("/checkexist", isAuth, checkexistrequest)

module.exports = router;