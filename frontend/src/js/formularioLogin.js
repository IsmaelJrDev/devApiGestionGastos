import apiClient from "../services/conexion.service";

/**
 * Maneja el inicio de sesión del usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<object>} Los datos de la respuesta del inicio de sesión.
 * @throws {Error} Si la solicitud falla, lanza un error con un mensaje descriptivo.
 */
export const login = async (email, password) => {
    try {
        const response = await apiClient.post("/user/login", {
            email,
            password,
        });
        if (response.data.token) {
            // Almacena el token en localStorage para futuras autenticaciones
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        // Centraliza el manejo de errores para mensajes específicos del backend o genéricos
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(
            "Error al iniciar sesión. Por favor, intenta de nuevo."
        );
    }
};

/**
 * Maneja el registro de un nuevo usuario.
 * @param {string} email - El correo electrónico del nuevo usuario.
 * @param {string} password - La contraseña del nuevo usuario.
 * @returns {Promise<object>} Los datos de la respuesta del registro.
 * @throws {Error} Si la solicitud falla, lanza un error con un mensaje descriptivo.
 */
export const register = async (email, password) => {
    try {
        const response = await apiClient.post("/user/register", {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        // Centraliza el manejo de errores para mensajes específicos del backend o genéricos
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(
            "Error al registrar usuario. Intenta con un correo diferente o más tarde."
        );
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    // Para una experiencia de usuario más fluida, considera usar un enrutador (e.g., React Router)
    // para navegar programáticamente en lugar de recargar la página.
    window.location.reload();
};
