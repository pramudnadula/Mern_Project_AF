const router = require('express').Router();
const authController = require("../Controllers/user");

router.post("/login", authController.login);

router.post("/signup", authController.signup);

router.put("/update/:userId", authController.update);

// get one user for update
router.get("/getuser/:userId", authController.getUser);

router.delete("/delete/:userId", authController.delete);
router.get("/getstudnets/:id", authController.getstudents);
router.get("/getnotassigend", authController.notassigendstudents);



module.exports = router;