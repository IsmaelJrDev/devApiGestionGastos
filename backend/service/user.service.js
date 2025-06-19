const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (email, password) => {
    try {
        const user = new User({ email, password });
        return await user.save();
    } catch (error) {
        throw new Error("Usuario no guardado: " + (error.message || ""));
    }
};

exports.login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            throw new Error("Credenciales inválidas");
        }

        const token = exports.generateToken(user);
        return token;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || "Error en la base de datos");
    }
};

exports.generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
        expiresIn: "3d",
    });
};
