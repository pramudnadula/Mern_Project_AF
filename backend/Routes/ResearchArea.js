const router = require('express').Router();
const { createarea, allAreas } = require('../Controllers/ResearchArea');
let ResearchArea = require('../Models/ResearchArea');
const isAuth = require("../middleware/auth");//pass the middleware

router.get('/researchareas/list', allAreas)
router.post("/researchareas/create",isAuth, createarea)

module.exports = router;