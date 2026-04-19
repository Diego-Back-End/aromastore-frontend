import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const [direccion, setDireccion] = useState('')
  const [ciudad, setCiudad] = useState('')
  const navigate = useNavigate()

  const handleConfirmar = () => {
    console.log('Pedido confirmado:', direccion, ciudad)
    navigate('/mis-pedidos')
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px' }}>
      <h1>Confirmar Pedido</h1>
      <h3>Resumen</h3>
      <p>Perfume Noir x1 — $29.990</p>
      <p>Acqua Fresh x2 — $39.980</p>
      <h2>Total: $69.970</h2>
      <h3>Dirección de envío</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={e => setDireccion(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={e => setCiudad(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleConfirmar} style={{ padding: '0.5rem', borderRadius: '4px' }}>
          Confirmar Pedido 
        </button>
      </div>
    </div>
  )
}

export default Checkout