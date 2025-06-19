const userService = require("../service/user.service");

exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userService.register(email, password);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await userService.login(email, password);
        res.json({ token });
    } catch (error) {
        // Devuelve un error 401 si las credenciales son inválidas
        res.status(401).json({ message: "Credenciales inválidas" });
    }
};
