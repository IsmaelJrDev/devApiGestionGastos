const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * ANOTACIÓN: Corregido el servicio de registro.
 * La corrección clave es verificar PRIMERO si el usuario ya existe.
 * Si el email ya está en la base de datos, lanzamos un error específico
 * que el frontend podrá mostrar al usuario.
 */
exports.register = async (email, password) => {
  // 1. Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // Lanzamos un error con un mensaje claro.
    const error = new Error("El correo electrónico ya está registrado.");
    error.statusCode = 409; // 409 Conflict: indica que la solicitud no se pudo completar debido a un conflicto con el estado actual del recurso.
    throw error;
  }

  // 2. Si no existe, crear y guardar el nuevo usuario.
  const user = new User({ email, password });
  await user.save(); // El pre-hook en el modelo se encargará de hashear la contraseña.
  
  // No devolvemos el usuario completo para no exponer la contraseña hasheada.
  return { message: "Usuario registrado exitosamente." };
};

/**
 * ANOTACIÓN: Corregido el servicio de login.
 * Se ha mejorado el manejo de errores para asegurar que siempre se lance
 * un error con un mensaje claro si las credenciales no son válidas.
 */
exports.login = async (email, password) => {
    // 1. Buscar al usuario por su email.
    const user = await User.findOne({ email });

    // 2. Si no se encuentra el usuario O la contraseña no coincide, lanzar error.
    // El método `comparePassword` está en el modelo User.model.js y devuelve true/false.
    if (!user || !(await user.comparePassword(password))) {
      const error = new Error("Credenciales inválidas. Por favor, verifique su correo y contraseña.");
      error.statusCode = 401; // 401 Unauthorized: el cliente debe autenticarse para obtener la respuesta solicitada.
      throw error;
    }

    // 3. Si las credenciales son correctas, generar y devolver el token.
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: "3d" });
    return token;
};
