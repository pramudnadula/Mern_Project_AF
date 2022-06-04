const router = require('express').Router();
const { createarea, allAreas, sample } = require('../Controllers/ResearchArea');
let ResearchArea = require('../Models/ResearchArea');
const isAuth = require("../middleware/auth");//pass the middleware

router.get('/researchareas/list', allAreas)
router.post("/researchareas/create", isAuth, createarea)
router.get("/sample", sample)

module.exports = router;