const router = require('express').Router();
const { createarea, allAreas } = require('../Controllers/ResearchArea');
let ResearchArea = require('../Models/ResearchArea');

router.get('/researchareas/list', allAreas)
router.post("/researchareas/create", createarea)

module.exports = router;