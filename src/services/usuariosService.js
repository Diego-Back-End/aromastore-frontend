import api from '../api/axiosConfig';

// Iniciar sesión
export const login = async (credentials) => {
  try {
    const response = await api.post('/api/usuarios/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Registrar nuevo usuario
export const register = async (userData) => {
  try {
    const response = await api.post('/api/usuarios/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

// Obtener perfil del usuario actual
export const getProfile = async () => {
  try {
    const response = await api.get('/api/usuarios/profile');
    return response.data;
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    throw error;
  }
};

// Actualizar perfil del usuario
export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/api/usuarios/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error;
  }
};

// Cambiar contraseña
export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/api/usuarios/password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    throw error;
  }
};

// Solicitar recuperación de contraseña
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/api/usuarios/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Error en solicitud de recuperación:', error);
    throw error;
  }
};

// Restablecer contraseña
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post('/api/usuarios/reset-password', {
      token,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    throw error;
  }
};

// Verificar email
export const verifyEmail = async (token) => {
  try {
    const response = await api.post('/api/usuarios/verify-email', { token });
    return response.data;
  } catch (error) {
    console.error('Error al verificar email:', error);
    throw error;
  }
};

// Cerrar sesión (invalidar token en backend)
export const logout = async () => {
  try {
    const response = await api.post('/api/usuarios/logout');
    return response.data;
  } catch (error) {
    console.error('Error en logout:', error);
    throw error;
  }
};

// Eliminar cuenta de usuario
export const deleteAccount = async () => {
  try {
    const response = await api.delete('/api/usuarios/account');
    return response.data;
  } catch (error) {
    console.error('Error al eliminar cuenta:', error);
    throw error;
  }
};