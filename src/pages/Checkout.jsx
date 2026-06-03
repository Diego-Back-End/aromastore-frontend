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
    <div style={{ padding: '2rem', maxWidth: '500px', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}>Confirmar Pedido</h1>
      <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>Resumen</h3>
      <p style={{ color: '#aaaaaa' }}>Perfume Noir x1 — $29.990</p>
      <p style={{ color: '#aaaaaa' }}>Acqua Fresh x2 — $39.980</p>
      <h2 style={{ color: '#ffffff', marginTop: '1rem' }}>Total: $69.970</h2>
      <h3 style={{ color: '#ffffff', marginBottom: '1rem', marginTop: '2rem' }}>Dirección de envío</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={e => setDireccion(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #1a1a2e', backgroundColor: '#1a1a2e', color: '#ffffff' }}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={e => setCiudad(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #1a1a2e', backgroundColor: '#1a1a2e', color: '#ffffff' }}
        />
        <button onClick={handleConfirmar} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#c9a84c', color: '#000000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  )
}

export default Checkout