function Notificaciones() {
  const notificaciones = [
    { id: 1, mensaje: 'Tu pedido #2 está en camino', fecha: '2026-04-15', leida: false },
    { id: 2, mensaje: 'Tu pedido #1 fue entregado', fecha: '2026-04-10', leida: true },
    { id: 3, mensaje: 'Bienvenido a AromaStore', fecha: '2026-04-01', leida: true },
  ]

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Notificaciones</h1>
      {notificaciones.map(n => (
        <div key={n.id} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          background: n.leida ? 'transparent' : '#1a1a2e'
        }}>
          <p>{n.mensaje}</p>
          <small>{n.fecha}</small>
          {!n.leida && <span style={{ marginLeft: '1rem', color: 'orange' }}>● Nueva</span>}
        </div>
      ))}
    </div>
  )
}

export default Notificaciones