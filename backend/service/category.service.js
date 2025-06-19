const CategoryModel=require("../models/Category.model")

module.exports.create = async(name,userId)=>{
    const category = new CategoryModel({name, user:userId});
    return await category.save();
}

module.exports.getAll = async(userId)=>{
    return await CategoryModel.find({user:userId});
}





