import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Carrito() {
  const navigate = useNavigate()

  const [items, setItems] = useState([
    { id: 1, nombre: 'Perfume Noir', precio: 29990, cantidad: 1 },
    { id: 2, nombre: 'Acqua Fresh', precio: 19990, cantidad: 2 },
  ])

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const eliminar = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}>🛒 Mi Carrito</h1>
      {items.length === 0 ? (
        <p style={{ color: '#aaaaaa' }}>Tu carrito está vacío</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1a2e', padding: '1rem 0', backgroundColor: '#1a1a2e', marginBottom: '1rem', borderRadius: '8px', padding: '1rem' }}>
              <div>
                <h3 style={{ color: '#ffffff' }}>{item.nombre}</h3>
                <p style={{ color: '#aaaaaa' }}>Cantidad: {item.cantidad}</p>
                <p style={{ color: '#ffffff' }}>${(item.precio * item.cantidad).toLocaleString()}</p>
              </div>
              <button onClick={() => eliminar(item.id)} style={{ padding: '0.5rem 1rem', backgroundColor: '#c9a84c', color: '#000000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
            </div>
          ))}
          <h2 style={{ color: '#ffffff', marginTop: '2rem' }}>Total: ${total.toLocaleString()}</h2>
          <button onClick={() => navigate('/checkout')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#c9a84c', color: '#000000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}>Ir al Checkout →</button>
        </>
      )}
    </div>
  )
}

export default Carrito