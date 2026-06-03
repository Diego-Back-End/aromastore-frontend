import { useNavigate } from 'react-router-dom'

function MisPedidos() {
  const navigate = useNavigate()

  const pedidos = [
    { id: 1, fecha: '2026-04-10', total: 29990, estado: 'Entregado' },
    { id: 2, fecha: '2026-04-15', total: 69970, estado: 'En camino' },
    { id: 3, fecha: '2026-04-19', total: 19990, estado: 'Pendiente' },
  ]

  const colorEstado = (estado) => {
    if (estado === 'Entregado') return '#4ade80'
    if (estado === 'En camino') return '#fbbf24'
    return '#9ca3af'
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}>📦 Mis Pedidos</h1>
      {pedidos.map(p => (
        <div key={p.id} style={{ border: '1px solid #c9a84c', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', backgroundColor: '#1a1a2e' }}>
          <p style={{ color: '#ffffff' }}><strong>Pedido #{p.id}</strong></p>
          <p style={{ color: '#aaaaaa' }}>Fecha: {p.fecha}</p>
          <p style={{ color: '#ffffff' }}>Total: ${p.total.toLocaleString()}</p>
          <p style={{ color: '#aaaaaa' }}>Estado: <span style={{ color: colorEstado(p.estado), fontWeight: 'bold' }}>{p.estado}</span></p>
        </div>
      ))}
      <button onClick={() => navigate('/')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#c9a84c', color: '#000000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}>Seguir comprando</button>
    </div>
  )
}

export default MisPedidos