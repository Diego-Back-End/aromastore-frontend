import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MisPedidos() {
  const navigate = useNavigate()
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      try {
        const usuarioId = localStorage.getItem('usuarioId') || 1
        const response = await fetch(`http://localhost:8080/api/pedidos/usuario/${usuarioId}`)
        const data = await response.json()
        setPedidos(data)
      } catch (error) {
        console.error('Error cargando pedidos:', error)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  const colorEstado = (estado) => {
    if (estado === 'ENTREGADO') return '#4ade80'
    if (estado === 'ENVIADO') return '#fbbf24'
    if (estado === 'PENDIENTE') return '#9ca3af'
    return '#c9a84c'
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}> Mis Pedidos</h1>

        {cargando ? (
          <p style={{ color: '#aaaaaa' }}>Cargando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p style={{ color: '#aaaaaa', fontSize: '1.2rem', marginBottom: '1rem' }}>No tienes pedidos aún</p>
            <button onClick={() => navigate('/catalogo-productos')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#c9a84c', color: '#000000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ver Catálogo
            </button>
          </div>
        ) : (
          <>
            {pedidos.map(p => (
              <div key={p.id} style={{ border: '1px solid #c9a84c', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', backgroundColor: '#1a1a2e' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem' }}>Pedido #{p.id}</p>
                  <span style={{ color: colorEstado(p.estado), fontWeight: 'bold', backgroundColor: '#0d0d0d', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                    {p.estado}
                  </span>
                </div>
                <p style={{ color: '#aaaaaa', marginTop: '0.5rem' }}>Fecha: {new Date(p.fechaCreacion).toLocaleDateString()}</p>
                <p style={{ color: '#aaaaaa' }}>Producto ID: {p.productoId}</p>
                <p style={{ color: '#aaaaaa' }}>Cantidad: {p.cantidad}</p>
                <p style={{ color: '#c9a84c', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '0.5rem' }}>Total: ${p.total.toLocaleString()}</p>
              </div>
            ))}
            <button onClick={() => navigate('/catalogo-productos')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#c9a84c', color: '#000000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}>
              Seguir comprando
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default MisPedidos