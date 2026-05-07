import axios from 'axios';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para agregar token JWT a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo de errores y respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores comunes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // No autorizado - limpiar token y redirigir a login
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Prohibido
          console.error('Acceso prohibido');
          break;
        case 404:
          // No encontrado
          console.error('Recurso no encontrado');
          break;
        case 500:
          // Error del servidor
          console.error('Error del servidor');
          break;
        default:
          console.error('Error en la petición:', error.response.data?.message || 'Error desconocido');
      }
    } else if (error.request) {
      // Error de red
      console.error('Error de red - verifique su conexión');
    } else {
      // Otro error
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
