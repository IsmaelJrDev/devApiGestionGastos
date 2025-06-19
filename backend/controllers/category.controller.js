const CategoryService = require("../service/category.service")

module.exports.create =async (req,res,next)=>{
    const {name} = req.body;
    const id = req.user._id;
    try {
        const category = await CategoryService.create(name,id);
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
}

module.exports.getAll = async (req,res,next)=>{
    const id = req.user._id;
    try {
        const categories = await CategoryService.getAll(id);
        res.json(categories);
    } catch (error) {
        next(error)
        
    }
}