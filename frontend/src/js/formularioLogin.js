import apiClient from '../services/api';

export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/user/login', { email, password });
        if (response.data.token) {
            // Guardamos el token en localStorage para usarlo en futuras peticiones
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        // ANOTACIÓN: Propagación de error mejorada.
        // Si el backend envía un error estructurado (como lo hará ahora),
        // lanzamos el mensaje específico. De lo contrario, lanzamos un mensaje genérico.
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Error de conexión o del servidor.');
    }
};

export const register = async (email, password) => {
    try {
        const response = await apiClient.post('/user/register', { email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('No se pudo completar el registro.');
    }
};

// Función para cerrar sesión, limpia el token.
export const logout = () => {
    localStorage.removeItem('token');
    // Para asegurar que el usuario es redirigido a la página de login.
    window.location.reload();
};
