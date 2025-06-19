const TransactionModel = require("../models/Transaction.model");

/**
 * Servicio principal para el filtrado, con la corrección definitiva para fechas.
 */
exports.getByFilters = async (userId, filters) => {
    let query = { user: userId };

    if (filters.type) {
        query.type = filters.type;
    }

    // Si en los filtros viene una 'date', procesamos el rango.
    if (filters.date) { // El formato de filters.date es 'YYYY-MM-DD'
        
        // ==================================================================
        // INICIO DE LA CORRECCIÓN DEFINITIVA DE ZONA HORARIA
        // ==================================================================
        //
        // Forzamos a JavaScript a interpretar la fecha en la ZONA HORARIA LOCAL DEL SERVIDOR
        // añadiendo la hora al final de la cadena. Esto evita la interpretación
        // automática a UTC que causa el problema.

        // Crea una fecha para el inicio del día seleccionado (00:00:00) en la zona local del servidor.
        const startDate = new Date(`${filters.date}T00:00:00`);

        // Crea una fecha para el final del día seleccionado (23:59:59) en la zona local del servidor.
        const endDate = new Date(`${filters.date}T23:59:59.999`);

        // Con este rango, la consulta a MongoDB buscará todas las transacciones
        // que ocurrieron durante las 24 horas del día seleccionado, respetando
        // la zona horaria en la que fueron guardadas.
        query.date = { $gte: startDate, $lte: endDate };
        
        // Para depuración: puedes descomentar la siguiente línea para ver en la consola del backend
        // el rango exacto que se está enviando a la base de datos.
        // console.log("Querying date range:", query.date);
        // ==================================================================
        // FIN DE LA CORRECCIÓN
        // ==================================================================
    }

    // Ejecutamos la consulta con todos los filtros aplicados.
    return await TransactionModel.find(query)
        .populate('category')
        .sort({ date: -1 });
};

exports.create = async (data, userId) => {
    const transaction = new TransactionModel({
        ...data,
        user: userId
    });
    const savedTransaction = await transaction.save();
    return savedTransaction.populate('category');
};

exports.getAll = async (userId) => {
    return await TransactionModel.find({ user: userId })
        .populate('category')
        .sort({ date: -1 });
};

exports.getRecent = async (userId) => {
    return await TransactionModel.find({ user: userId })
        .populate('category')
        .sort({ date: -1 })
        .limit(6);
};
