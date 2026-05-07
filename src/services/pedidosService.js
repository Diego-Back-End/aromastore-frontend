import api from '../api/axiosConfig';

// Obtener todos los pedidos del usuario
export const getPedidos = async () => {
  try {
    const response = await api.get('/api/pedidos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    throw error;
  }
};

// Obtener un pedido por ID
export const getPedidoById = async (id) => {
  try {
    const response = await api.get(`/api/pedidos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener pedido ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo pedido
export const createPedido = async (pedidoData) => {
  try {
    const response = await api.post('/api/pedidos', pedidoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
};

// Actualizar estado de un pedido
export const updatePedidoStatus = async (id, status) => {
  try {
    const response = await api.put(`/api/pedidos/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar estado del pedido ${id}:`, error);
    throw error;
  }
};

// Cancelar un pedido
export const cancelPedido = async (id) => {
  try {
    const response = await api.put(`/api/pedidos/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Error al cancelar pedido ${id}:`, error);
    throw error;
  }
};

// Obtener historial de pedidos con paginación
export const getPedidosHistory = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/api/pedidos/history?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de pedidos:', error);
    throw error;
  }
};

// Obtener pedidos por estado
export const getPedidosByStatus = async (status) => {
  try {
    const response = await api.get(`/api/pedidos/status/${status}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener pedidos con estado ${status}:`, error);
    throw error;
  }
};

// Calcular costo de envío
export const calcularEnvio = async (direccion, productos) => {
  try {
    const response = await api.post('/api/pedidos/calcular-envio', {
      direccion,
      productos
    });
    return response.data;
  } catch (error) {
    console.error('Error al calcular envío:', error);
    throw error;
  }
};

// Aplicar cupón de descuento
export const aplicarCupon = async (codigo, total) => {
  try {
    const response = await api.post('/api/pedidos/aplicar-cupon', {
      codigo,
      total
    });
    return response.data;
  } catch (error) {
    console.error('Error al aplicar cupón:', error);
    throw error;
  }
};

// Obtener tracking de un pedido
export const getPedidoTracking = async (id) => {
  try {
    const response = await api.get(`/api/pedidos/${id}/tracking`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener tracking del pedido ${id}:`, error);
    throw error;
  }
};