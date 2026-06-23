import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/axiosConfig'
import '../styles/AdminProductos.css'

function AdminProductos() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    imagen: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    const usuarioActual = usuarioGuardado ? JSON.parse(usuarioGuardado) : null
    if (!usuarioActual || usuarioActual.rol !== 'ADMIN') {
      navigate('/')
      return
    }
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    setLoading(true)
    try {
      const response = await api.get('/api/productos')
      setProductos(response.data)
      setError('')
    } catch (err) {
      setError('Error al cargar productos')
      console.error('Error fetching productos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        stock: product.stock || '',
        categoria: product.categoria || '',
        imagen: product.imagen || ''
      })
    } else {
      setEditingProduct(null)
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
        imagen: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoria: '',
      imagen: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock)
      }

      if (editingProduct) {
        await api.put(`/api/productos/${editingProduct.id}`, payload)
      } else {
        await api.post('/api/productos', payload)
      }

      await fetchProductos()
      handleCloseModal()
      setError('')
    } catch (err) {
      setError(editingProduct ? 'Error al actualizar producto' : 'Error al crear producto')
      console.error('Error saving producto:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (product) => {
    setProductToDelete(product)
    setShowDeleteConfirm(true)
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return

    setLoading(true)
    try {
      await api.delete(`/api/productos/${productToDelete.id}`)
      await fetchProductos()
      setShowDeleteConfirm(false)
      setProductToDelete(null)
      setError('')
    } catch (err) {
      setError('Error al eliminar producto')
      console.error('Error deleting producto:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false)
    setProductToDelete(null)
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Gestión de Productos</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => handleOpenModal()}
        >
          Agregar Producto
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && !showModal ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>${Number(producto.precio).toLocaleString('es-CL')}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    {producto.imagen ? (
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre} 
                        className="product-thumbnail"
                      />
                    ) : (
                      <span className="no-image">Sin imagen</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleOpenModal(producto)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDeleteClick(producto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {productos.length === 0 && !loading && (
            <div className="empty-state">
              No hay productos registrados
            </div>
          )}
        </div>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Precio</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Imagen (URL)</label>
                <input
                  type="url"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : (editingProduct ? 'Actualizar' : 'Crear')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && productToDelete && (
        <div className="modal-overlay">
          <div className="modal modal-small">
            <div className="modal-header">
              <h2>Confirmar Eliminación</h2>
            </div>
            <div className="modal-body">
              <p>
                ¿Estás seguro de que deseas eliminar el producto "
                <strong>{productToDelete.nombre}</strong>"?
              </p>
              <p className="warning-text">Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={handleDeleteCancel}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-delete"
                onClick={handleDeleteConfirm}
                disabled={loading}
              >
                {loading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProductos
