import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductoById } from '../services/productosService'
import { useCarrito } from '../context/CarritoContext'

function DetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { agregarAlCarrito } = useCarrito()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductoById(id)
        setProducto(data)
      } catch (error) {
        console.error('Error cargando producto:', error)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  if (cargando) return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', 
      display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p style={{ color: '#ffffff' }}>Cargando...</p>
    </div>
  )

  if (!producto) return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <p style={{ color: '#ffffff' }}>Producto no encontrado</p>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <button onClick={() => navigate(-1)} style={{ 
        backgroundColor: 'transparent', color: '#c9a84c', 
        border: '1px solid #c9a84c', padding: '0.5rem 1rem', 
        borderRadius: '4px', cursor: 'pointer', marginBottom: '2rem' 
      }}>← Volver</button>
      
      <div style={{ 
        backgroundColor: '#1a1a2e', borderRadius: '12px', 
        padding: '2rem', maxWidth: '600px', margin: '0 auto',
        border: '1px solid #c9a84c' 
      }}>
        <div style={{ 
          backgroundColor: '#0d0d0d', height: '200px', 
          borderRadius: '8px', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <span style={{ color: '#c9a84c', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {producto.nombre}
          </span>
        </div>
        
        <h1 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>{producto.nombre}</h1>
        <p style={{ color: '#aaaaaa', marginBottom: '1rem' }}>{producto.descripcion}</p>
        <p style={{ color: '#c9a84c', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          ${producto.precio}
        </p>
        <p style={{ color: '#aaaaaa', marginBottom: '1rem' }}>
          Categoría: {producto.categoria}
        </p>
        <p style={{ color: producto.stock > 0 ? '#4caf50' : '#f44336', marginBottom: '1.5rem' }}>
          {producto.stock > 0 ? `✓ En stock (${producto.stock} unidades)` : '✗ Agotado'}
        </p>
        
        <button 
          onClick={() => { agregarAlCarrito(producto); navigate('/carrito') }}
          disabled={producto.stock === 0}
          style={{ 
            width: '100%', padding: '0.75rem', 
            backgroundColor: '#c9a84c', color: '#000000', 
            fontWeight: 'bold', border: 'none', 
            borderRadius: '4px', cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Agregar al Carrito 🛒
        </button>
      </div>
    </div>
  )
}

export default DetalleProducto