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
    <div style={{ padding: '2rem' }}>
      <h1>🛒 Mi Carrito</h1>
      {items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
              <div>
                <h3>{item.nombre}</h3>
                <p>Cantidad: {item.cantidad}</p>
                <p>${(item.precio * item.cantidad).toLocaleString()}</p>
              </div>
              <button onClick={() => eliminar(item.id)}>Eliminar</button>
            </div>
          ))}
          <h2>Total: ${total.toLocaleString()}</h2>
          <button onClick={() => navigate('/checkout')}>Ir al Checkout →</button>
        </>
      )}
    </div>
  )
}

export default Carrito