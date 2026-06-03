import api from '../api/axiosConfig';

export const login = async (credentials) => {
  try {
    const response = await api.post('/api/usuarios/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const getUsuarios = async () => {
  try {
    const response = await api.get('/api/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const createUsuario = async (usuario) => {
  try {
    const response = await api.post('/api/usuarios', usuario);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

export const register = async (usuario) => {
  try {
    const response = await api.post('/api/usuarios', usuario);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};
