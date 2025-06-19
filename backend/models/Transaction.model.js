const mongoose = require("mongoose");

const transactionSchema =  new mongoose.Schema({
    amount:{
        type: Number,
        require:true,
    },
    date:{
        type:Date,
        default: Date.now
    },
    type:{
        type:String,
        required:true,
        enum:["Ingreso","Egreso"],
    },
    description:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
        index:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        require:true,
        index:true,
    },
});

module.exports = mongoose.model("Transaction",transactionSchema);