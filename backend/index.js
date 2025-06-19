const handleError = require("./middlewares/error.middleware");
const TransactionRoutes = require("./routes/transaction.routes");
const { default: mongoose } = require("mongoose");
const userRouters = require("./routes/user.routes");
const CategoryRoutes = require("./routes/category.routes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde tu frontend
app.use(express.json());

// Rutas de la API
app.use("/user", userRouters);
app.use("/category", CategoryRoutes);
app.use("/transaction", TransactionRoutes);

// ANOTACIÓN: El middleware de manejo de errores DEBE ir después de las rutas.
// De esta forma, puede capturar cualquier error que ocurra en los controladores.
app.use(handleError);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Base de datos conectada");
        app.listen(process.env.PORT || 3000, () => {
            console.log("Servidor corriendo en el puerto " + process.env.PORT);
        });
    })
    .catch((error) => {
        console.error("No se pudo conectar a la base de datos:", error);
    });