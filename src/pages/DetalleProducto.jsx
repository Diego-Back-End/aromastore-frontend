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
  const [cantidad, setCantidad] = useState(1)

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
        <div style={{ height: '320px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {producto.imagen ? (
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
            />
          ) : (
            <span style={{ color: '#c9a84c', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', padding: '1rem', wordBreak: 'break-word' }}>
              {producto.nombre}
            </span>
          )}
        </div>
        
        <h1 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '1.8rem', lineHeight: '1.3' }}>
          {producto.nombre}
        </h1>
        <p style={{ color: '#aaaaaa', marginBottom: '1rem' }}>{producto.descripcion}</p>
        <p style={{ color: '#c9a84c', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          ${Number(producto.precio).toLocaleString('es-CL')}
        </p>
        <p style={{ color: '#aaaaaa', marginBottom: '1rem' }}>
          Categoría: {producto.categoria}
        </p>
        <p style={{ color: producto.stock > 0 ? '#4caf50' : '#f44336', marginBottom: '1rem' }}>
          {producto.stock > 0 ? `✓ En stock (${producto.stock} unidades)` : '✗ Agotado'}
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ color: '#aaaaaa' }}>Cantidad:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0d0d0d', borderRadius: '8px', padding: '0.25rem' }}>
            <button 
              onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
              style={{ width: '32px', height: '32px', backgroundColor: '#1a1a2e', color: '#c9a84c', border: '1px solid #c9a84c', borderRadius: '4px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              −
            </button>
            <span style={{ color: '#ffffff', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
              {cantidad}
            </span>
            <button 
              onClick={() => setCantidad(prev => Math.min(producto.stock, prev + 1))}
              style={{ width: '32px', height: '32px', backgroundColor: '#1a1a2e', color: '#c9a84c', border: '1px solid #c9a84c', borderRadius: '4px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              +
            </button>
          </div>
          <span style={{ color: '#aaaaaa', fontSize: '0.85rem' }}>
            (máx. {producto.stock})
          </span>
        </div>
        
        <button 
          onClick={() => { agregarAlCarrito({ ...producto, cantidad }); navigate('/carrito') }}
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