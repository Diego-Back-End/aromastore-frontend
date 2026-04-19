import { useNavigate } from 'react-router-dom'

function MisPedidos() {
  const navigate = useNavigate()

  const pedidos = [
    { id: 1, fecha: '2026-04-10', total: 29990, estado: 'Entregado' },
    { id: 2, fecha: '2026-04-15', total: 69970, estado: 'En camino' },
    { id: 3, fecha: '2026-04-19', total: 19990, estado: 'Pendiente' },
  ]

  const colorEstado = (estado) => {
    if (estado === 'Entregado') return 'green'
    if (estado === 'En camino') return 'orange'
    return 'gray'
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📦 Mis Pedidos</h1>
      {pedidos.map(p => (
        <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Pedido #{p.id}</strong></p>
          <p>Fecha: {p.fecha}</p>
          <p>Total: ${p.total.toLocaleString()}</p>
          <p>Estado: <span style={{ color: colorEstado(p.estado) }}>{p.estado}</span></p>
        </div>
      ))}
      <button onClick={() => navigate('/')}>Seguir comprando</button>
    </div>
  )
}

export default MisPedidos