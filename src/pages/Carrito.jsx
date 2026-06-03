import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Carrito() {
  const navigate = useNavigate()
  const { items, eliminarDelCarrito, total } = useCarrito()

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}> Mi Carrito</h1>
      
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ color: '#aaaaaa', fontSize: '1.2rem', marginBottom: '1rem' }}>
            Tu carrito está vacío
          </p>
          <button onClick={() => navigate('/catalogo-productos')} style={{ 
            padding: '0.75rem 1.5rem', backgroundColor: '#c9a84c', 
            color: '#000000', fontWeight: 'bold', border: 'none', 
            borderRadius: '4px', cursor: 'pointer' 
          }}>
            Ver Catálogo
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {items.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', justifyContent: 'space-between', 
              alignItems: 'center', backgroundColor: '#1a1a2e', 
              marginBottom: '1rem', borderRadius: '8px', 
              padding: '1.5rem', border: '1px solid #2a2a4e' 
            }}>
              <div>
                <h3 style={{ color: '#ffffff', marginBottom: '0.25rem' }}>{item.nombre}</h3>
                <p style={{ color: '#aaaaaa' }}>Cantidad: {item.cantidad}</p>
                <p style={{ color: '#c9a84c', fontWeight: 'bold' }}>
                  ${(item.precio * item.cantidad).toLocaleString()}
                </p>
              </div>
              <button onClick={() => eliminarDelCarrito(item.id)} style={{ 
                padding: '0.5rem 1rem', backgroundColor: 'transparent', 
                color: '#ff4444', fontWeight: 'bold', 
                border: '1px solid #ff4444', borderRadius: '4px', cursor: 'pointer' 
              }}>
                Eliminar
              </button>
            </div>
          ))}
          
          <div style={{ 
            backgroundColor: '#1a1a2e', borderRadius: '8px', 
            padding: '1.5rem', marginTop: '1rem',
            border: '1px solid #c9a84c' 
          }}>
            <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>
              Total: <span style={{ color: '#c9a84c' }}>${total.toLocaleString()}</span>
            </h2>
            <button onClick={() => navigate('/checkout')} style={{ 
              width: '100%', padding: '0.75rem', backgroundColor: '#c9a84c', 
              color: '#000000', fontWeight: 'bold', border: 'none', 
              borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' 
            }}>
              Ir al Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carrito