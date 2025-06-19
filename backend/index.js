const handleError =  require("./middlewares/error.middleware");
const TransactionRoutes = require("./routes/transaction.routes");
const { default: mongoose } = require("mongoose");
const userRouters = require("./routes/user.routes");
const CategoryRoutes =  require("./routes/category.routes")
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app =  express();

//meddlewares
app.use(express.json());
app.use(cors());
app.use(handleError);

app.use("/user",userRouters);
app.use("/category",CategoryRoutes);
app.use("/transaction",TransactionRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Base de datos conectada");
    app.listen(process.env.PORT || 3000,()=>{
        console.log("servidor corriendo en el puerto"+ process.env.PORT);
    });
})

.catch((error)=>{
    console.error(error || "No se pudo conectar a la base de datos")
});



