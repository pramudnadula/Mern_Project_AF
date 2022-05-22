const { addrequest, getspecificrequest, requestresponse } = require('../Controllers/Request');

const router = require('express').Router();



router.post('/', addrequest)
router.get("/all/:id", getspecificrequest)
router.get("/reject", getspecificrequest)
router.post("/response", requestresponse)

module.exports = router;