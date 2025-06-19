const router = require("express").Router();
const CategoryController = require("../controllers/category.controller");
const authMiddlewares = require("../middlewares/auth.middlewares");

//Middeleware.global. para category
router.use(authMiddlewares);

router.get("/",CategoryController.getAll);
router.post("/",CategoryController.create);

module.exports = router;


