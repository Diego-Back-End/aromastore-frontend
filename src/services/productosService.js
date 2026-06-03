import api from '../api/axiosConfig';

export const getProductos = async () => {
  try {
    const response = await api.get('/api/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await api.get(`/api/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

export const createProducto = async (producto) => {
  try {
    const response = await api.post('/api/productos', producto);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};
