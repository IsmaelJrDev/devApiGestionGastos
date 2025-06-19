const TransactionModel = require ("../models/Transaction.model")

exports.getAll = async (userId)=>{
    return await TransactionModel.find({user:userId});
}

exports.getByCategoryId = async(userId,CategoryId)=>{
    return await TransactionModel.find({user:userId,category:CategoryId});
}

exports.getByDate = async (userId,date)=>{
    return await TransactionModel.find({user:userId,date:date});
}

exports.getIncome = async (userId)=>{
    return await TransactionModel.find({user:userId,type:"Ingreso"});
}

exports.getOutflow = async (userId)=>{
    return await TransactionModel.find({user:userId,type:"Egreso"});

}

exports.create = async (data,userId)=>{
    const Transaction = new TransactionModel({
        ...data,
        user:userId
    });
    return await Transaction.save();

}
