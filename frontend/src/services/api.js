import axios from 'axios';

// Creamos una instancia de Axios con la configuración base
const apiClient = axios.create({
    baseURL: 'http://localhost:3001', // La URL de tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// ANOTACIÓN: Usamos un interceptor para añadir el token a todas las peticiones
// que salgan desde el cliente hacia la API.
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;   