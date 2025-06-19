const TransactionService = require("../service/transaction.service");

module.exports.create = async (req,res,next)=>{
    const id=req.user._id;
    const data = req.body;
    try {
        const transaction =  await TransactionService.create(data,id);
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
}

module.exports.getAll = async (req,res,next)=>{
    const id= req.user._id;
    try {
        const transaction= await TransactionService.getAll(id);
        res.json(transaction);
    } catch (error) {
        next(error);
    }
}

module.exports.getByDate = async (req,res,next)=>{
    const id= req.user._id;
    const date = req.params.date;
    try {
        const fechas = await TransactionService.getByDate(id,date);
        res.json(fechas);
    } catch (error) {
        next(error);
    }
}

module.exports.getByCategoryId = async (req,res,next)=>{
    const id= req.user._id;
    const CategoryId = req.params.category;
    try {
        const categorias = await TransactionService.getByCategoryId(id,CategoryId);
        res.json(categorias);
    } catch (error) {
        next(error);
    }
}

module.exports.getIncome= async (req,res,next)=>{
    const id= req.user._id;
    try {
        const ingresos =await TransactionService.getIncome(id);
        res.json(ingresos);
    } catch (error) {
        next(error);
    }
}

module.exports.getOutflow = async (req,res,next)=>{
    const id= req.user._id;
    try {
        const egresos = await TransactionService.getOutflow(id);
        res.json(egresos);
    } catch (error) {
        next(error);
    }
    
}