import api from '../api/axiosConfig';

// Obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await api.get('/api/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Obtener un producto por ID
export const getProductoById = async (id) => {
  try {
    const response = await api.get(`/api/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo producto (admin)
export const createProducto = async (producto) => {
  try {
    const response = await api.post('/api/productos', producto);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

// Actualizar un producto (admin)
export const updateProducto = async (id, producto) => {
  try {
    const response = await api.put(`/api/productos/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar producto ${id}:`, error);
    throw error;
  }
};

// Eliminar un producto (admin)
export const deleteProducto = async (id) => {
  try {
    const response = await api.delete(`/api/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar producto ${id}:`, error);
    throw error;
  }
};

// Buscar productos
export const searchProductos = async (query) => {
  try {
    const response = await api.get(`/api/productos/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar productos:', error);
    throw error;
  }
};

// Obtener productos por categoría
export const getProductosByCategoria = async (categoria) => {
  try {
    const response = await api.get(`/api/productos/categoria/${encodeURIComponent(categoria)}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener productos de categoría ${categoria}:`, error);
    throw error;
  }
};

// Obtener productos destacados
export const getProductosDestacados = async () => {
  try {
    const response = await api.get('/api/productos/destacados');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos destacados:', error);
    throw error;
  }
};