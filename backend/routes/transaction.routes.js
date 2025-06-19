const TransactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const router = require("express").Router();

router.use(authMiddleware);

router.get("/", TransactionController.getAll);
router.get("/category/:category", TransactionController.getByCategoryId);
router.get("/date/:date", TransactionController.getByDate);
router.get("/income", TransactionController.getIncome);
router.get("/outflow", TransactionController.getOutflow);
router.post("/", TransactionController.create); 

module.exports = router; 
