const router = require("express").Router();
const isAuth = require("../middleware/auth"); //pass the middleware
const { createPanel, getAllPanels, addPanel, getAllAddPanels, getNotaddedPanels, getPanelsByUserId, getAddPanelsByUserId, getAddPanelsByPanelId, getPanelsByPanelId } = require("../Controllers/Panel");

router.post("/add", isAuth, createPanel);
router.get("/", isAuth, getAllPanels);
router.post("/addpanel", isAuth, addPanel);
router.get("/addpanel/all", isAuth, getAllAddPanels);
router.get("/notadded", isAuth, getNotaddedPanels);
router.get("/panels/user/:id", isAuth, getPanelsByUserId);
router.get("/addpanel/user/:id", isAuth, getAddPanelsByUserId);
router.get("/addpanel/addpanel/:id", isAuth, getAddPanelsByPanelId);
router.get("/addpanel/panel/:id", isAuth, getPanelsByPanelId)
module.exports = router;