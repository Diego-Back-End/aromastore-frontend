import api from '../api/axiosConfig';

export const getNotificaciones = async (usuarioId) => {
  try {
    const response = await api.get(`/api/notificaciones/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    throw error;
  }
};

export const marcarComoLeida = async (id) => {
  try {
    const response = await api.put(`/api/notificaciones/${id}/leer`);
    return response.data;
  } catch (error) {
    console.error('Error al marcar notificación:', error);
    throw error;
  }
};
