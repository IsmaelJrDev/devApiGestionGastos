const TransactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const router = require("express").Router();

// Aplicar el middleware de autenticación a todas las rutas de transacciones.
router.use(authMiddleware);

router.get("/filter", TransactionController.getByFilters);

// Ruta para obtener los movimientos recientes
router.get("/recent", TransactionController.getRecent);

// Rutas anteriores (se pueden mantener o eliminar si ya no se usan).
router.get("/", TransactionController.getAll);
router.get("/category/:category", TransactionController.getByCategoryId);
router.get("/date/:date", TransactionController.getByDate);
router.get("/income", TransactionController.getIncome);
router.get("/outflow", TransactionController.getOutflow);

// Ruta para crear una nueva transacción.
router.post("/", TransactionController.create);

// Nueva ruta para eliminar una transacción por su ID.
router.delete("/:id", TransactionController.deleteTransaction); // Add this line

module.exports = router;
