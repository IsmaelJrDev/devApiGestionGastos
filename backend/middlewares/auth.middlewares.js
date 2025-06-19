const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


module.exports = (req,res,next)=>{
    //Headers: {"authorization":"Bearer"}
    //req.headers.authorization,split(" "["Beare"])

    if(!req.headers.authorization) return res.status(401).json({message:"Token no ingresado"});

    const token =  req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).json({
        message:"Token no proporcionado"})

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({msessage:"token invalido"});
    }
}