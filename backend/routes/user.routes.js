const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.json({ message: "Ruta /user funcionando correctamente" });
});

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;





