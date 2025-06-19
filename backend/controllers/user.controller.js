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
    next(error);
  }
};
