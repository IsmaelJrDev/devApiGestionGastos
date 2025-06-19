const TransactionService = require("../service/transaction.service");

// Función para obtener movimientos (transacciones) con filtros
module.exports.getByFilters = async (req, res, next) => {
    try {
        const idDeUsuario = req.user._id; // Obtenemos el ID del usuario
        const filtros = req.query; // Obtenemos los filtros que vienen en la solicitud
        const movimientos = await TransactionService.getByFilters(
            idDeUsuario,
            filtros
        );
        return res.json(movimientos); // Enviamos los movimientos encontrados
    } catch (error) {
        next(error); // Si algo sale mal, pasamos el error para que sea manejado
    }
};

// Función para crear un nuevo movimiento
module.exports.create = async (req, res, next) => {
    try {
        const idDeUsuario = req.user._id; // Obtenemos el ID del usuario
        const datosDelMovimiento = req.body; // Obtenemos los datos del movimiento del cuerpo de la solicitud
        const nuevoMovimiento = await TransactionService.create(
            datosDelMovimiento,
            idDeUsuario
        );
        return res.status(201).json(nuevoMovimiento); // Enviamos el nuevo movimiento y un estado de "creado"
    } catch (error) {
        next(error); // Si algo sale mal, pasamos el error
    }
};

// Función para obtener todos los movimientos de un usuario
module.exports.getAll = async (req, res, next) => {
    try {
        const idDeUsuario = req.user._id; // Obtenemos el ID del usuario
        const todosLosMovimientos = await TransactionService.getAll(
            idDeUsuario
        );
        return res.json(todosLosMovimientos); // Enviamos todos los movimientos
    } catch (error) {
        next(error); // Si algo sale mal, pasamos el error
    }
};

// Función para obtener los movimientos más recientes de un usuario
module.exports.getRecent = async (req, res, next) => {
    try {
        const idDeUsuario = req.user._id; // Obtenemos el ID del usuario
        const movimientosRecientes = await TransactionService.getRecent(
            idDeUsuario
        );
        return res.json(movimientosRecientes); // Enviamos los movimientos recientes
    } catch (error) {
        next(error); // Si algo sale mal, pasamos el error
    }
};

// Función para obtener movimientos de un usuario por fecha
module.exports.getByDate = async (req, res, next) => {
    try {
        const idDeUsuario = req.user._id; // Obtenemos el ID del usuario
        const fechaParaBuscar = req.params.date; // Obtenemos la fecha de la dirección (URL)
        const movimientosPorFecha = await TransactionService.getByDate(
            idDeUsuario,
            fechaParaBuscar
        );
        return res.json(movimientosPorFecha); // Enviamos los movimientos de esa fecha
    } catch (error) {
        next(error); // Si algo sale mal, pasamos el error
    }
};

// Función para obtener movimientos de un usuario por ID de categoría
module.exports.getByCategoryId = async (req, res, next) => {
    try {
        const idDeUsuario = req.user._id; // Obtenemos el ID del usuario
        const idDeCategoria = req.params.category; // Obtenemos el ID de la categoría de la dirección (URL)
        const movimientosPorCategoria =
            await TransactionService.getByCategoryId(
                idDeUsuario,
                idDeCategoria
            );
        return res.json(movimientosPorCategoria); // Enviamos los movimientos de esa categoría
    } catch (error) {
        next(error); // Si algo sale mal, pasamos el error
    }
};

// Función para obtener solo los ingresos de un usuario
module.exports.getIncome = async (req, res, next) => {
    try {
        const idDeUsuario = req.user._id; // Obtenemos el ID del usuario
        const soloIngresos = await TransactionService.getIncome(idDeUsuario);
        return res.json(soloIngresos); // Enviamos solo los ingresos
    } catch (error) {
        next(error); // Si algo sale mal, pasamos el error
    }
};

// Función para obtener solo los egresos (gastos) de un usuario
module.exports.getOutflow = async (req, res, next) => {
    try {
        const idDeUsuario = req.user._id; // Obtenemos el ID del usuario
        const soloEgresos = await TransactionService.getOutflow(idDeUsuario);
        return res.json(soloEgresos); // Enviamos solo los egresos
    } catch (error) {
        next(error); // Si algo sale mal, pasamos el error
    }
};

// Función para eliminar un movimiento por su ID
module.exports.deleteTransaction = async (req, res, next) => {
    try {
        const idDeUsuario = req.user._id;
        const idDeMovimiento = req.params.id;
        const movimientoEliminado = await TransactionService.deleteTransaction(
            idDeMovimiento,
            idDeUsuario
        );
        if (!movimientoEliminado) {
            return res
                .status(404)
                .json({ message: "Movimiento no encontrado o no autorizado" });
        }
        return res
            .status(200)
            .json({ message: "Movimiento eliminado con éxito" });
    } catch (error) {
        next(error);
    }
};
