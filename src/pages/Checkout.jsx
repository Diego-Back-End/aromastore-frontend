import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Checkout() {
  const [direccion, setDireccion] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { items, total, eliminarDelCarrito } = useCarrito()

  const handleConfirmar = async () => {
    if (!direccion || !ciudad) {
      setError('Por favor completa todos los campos')
      return
    }

    if (items.length === 0) {
      setError('Tu carrito está vacío')
      return
    }

    setCargando(true)
    setError('')

    try {
      const usuarioId = localStorage.getItem('usuarioId') || 1

      const pedido = {
        usuarioId: Number(usuarioId),
        items: items.map(item => ({
          productoId: item.id,
          cantidad: item.cantidad,
          precioUnitario: item.precio
        }))
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      })

      if (!response.ok) throw new Error('Error al crear pedido')

      navigate('/mis-pedidos')
    } catch (err) {
      setError('Error al confirmar el pedido. Intenta de nuevo.')
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}>Confirmar Pedido</h1>

        <div style={{ backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #2a2a4e' }}>
          <h3 style={{ color: '#c9a84c', marginBottom: '1rem' }}>Resumen del Pedido</h3>
          {items.length === 0 ? (
            <p style={{ color: '#aaaaaa' }}>No hay productos en el carrito</p>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2a2a4e' }}>
                  <span style={{ color: '#ffffff' }}>{item.nombre} x{item.cantidad}</span>
                  <span style={{ color: '#c9a84c' }}>${(item.precio * item.cantidad).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #c9a84c' }}>
                <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.2rem' }}>Total</span>
                <span style={{ color: '#c9a84c', fontWeight: 'bold', fontSize: '1.2rem' }}>${total.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>

        <div style={{ backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '1.5rem', border: '1px solid #2a2a4e' }}>
          <h3 style={{ color: '#c9a84c', marginBottom: '1rem' }}>Dirección de envío</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #3a3a5e', backgroundColor: '#0d0d0d', color: '#ffffff' }}
            />
            <input
              type="text"
              placeholder="Ciudad"
              value={ciudad}
              onChange={e => setCiudad(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #3a3a5e', backgroundColor: '#0d0d0d', color: '#ffffff' }}
            />
            {error && <p style={{ color: '#ff4444' }}>{error}</p>}
            <button
              onClick={handleConfirmar}
              disabled={cargando || items.length === 0}
              style={{ padding: '0.75rem', backgroundColor: cargando ? '#888' : '#c9a84c', color: '#000000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer', fontSize: '1rem', marginTop: '0.5rem' }}
            >
              {cargando ? 'Procesando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout