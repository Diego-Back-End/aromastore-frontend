import api from '../api/axiosConfig';

// Obtener todas las notificaciones del usuario
export const getNotificaciones = async () => {
  try {
    const response = await api.get('/api/notificaciones');
    return response.data;
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    throw error;
  }
};

// Obtener notificaciones no leídas
export const getNotificacionesNoLeidas = async () => {
  try {
    const response = await api.get('/api/notificaciones/no-leidas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener notificaciones no leídas:', error);
    throw error;
  }
};

// Marcar notificación como leída
export const marcarComoLeida = async (id) => {
  try {
    const response = await api.put(`/api/notificaciones/${id}/leida`);
    return response.data;
  } catch (error) {
    console.error(`Error al marcar notificación ${id} como leída:`, error);
    throw error;
  }
};

// Marcar todas las notificaciones como leídas
export const marcarTodasComoLeidas = async () => {
  try {
    const response = await api.put('/api/notificaciones/marcar-todas-leidas');
    return response.data;
  } catch (error) {
    console.error('Error al marcar todas las notificaciones como leídas:', error);
    throw error;
  }
};

// Eliminar una notificación
export const deleteNotificacion = async (id) => {
  try {
    const response = await api.delete(`/api/notificaciones/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar notificación ${id}:`, error);
    throw error;
  }
};

// Eliminar todas las notificaciones
export const deleteAllNotificaciones = async () => {
  try {
    const response = await api.delete('/api/notificaciones/todas');
    return response.data;
  } catch (error) {
    console.error('Error al eliminar todas las notificaciones:', error);
    throw error;
  }
};

// Obtener contador de notificaciones no leídas
export const getContadorNotificaciones = async () => {
  try {
    const response = await api.get('/api/notificaciones/contador');
    return response.data;
  } catch (error) {
    console.error('Error al obtener contador de notificaciones:', error);
    throw error;
  }
};

// Suscribirse a notificaciones push
export const suscribirPush = async (endpoint) => {
  try {
    const response = await api.post('/api/notificaciones/suscribir-push', { endpoint });
    return response.data;
  } catch (error) {
    console.error('Error al suscribirse a notificaciones push:', error);
    throw error;
  }
};

// Cancelar suscripción a notificaciones push
export const cancelarSuscripcionPush = async () => {
  try {
    const response = await api.delete('/api/notificaciones/cancelar-suscripcion-push');
    return response.data;
  } catch (error) {
    console.error('Error al cancelar suscripción push:', error);
    throw error;
  }
};

// Actualizar preferencias de notificaciones
export const updatePreferenciasNotificaciones = async (preferencias) => {
  try {
    const response = await api.put('/api/notificaciones/preferencias', preferencias);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar preferencias de notificaciones:', error);
    throw error;
  }
};

// Obtener preferencias de notificaciones
export const getPreferenciasNotificaciones = async () => {
  try {
    const response = await api.get('/api/notificaciones/preferencias');
    return response.data;
  } catch (error) {
    console.error('Error al obtener preferencias de notificaciones:', error);
    throw error;
  }
};