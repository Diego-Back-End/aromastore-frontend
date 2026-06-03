import { useEffect, useState } from 'react'
import { getNotificaciones } from '../services/notificacionesService'

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      try {
        const usuarioId = localStorage.getItem('usuarioId') || 1
        const data = await getNotificaciones(usuarioId)
        setNotificaciones(data)
      } catch (error) {
        console.error('Error cargando notificaciones:', error)
        setNotificaciones([])
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  const formatearFecha = (fecha) => {
    if (!fecha) return ''
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}>🔔 Notificaciones</h1>

        {cargando ? (
          <p style={{ color: '#aaaaaa' }}>Cargando notificaciones...</p>
        ) : notificaciones.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p style={{ color: '#aaaaaa', fontSize: '1.2rem' }}>
              No tienes notificaciones aún
            </p>
          </div>
        ) : (
          notificaciones.map(n => (
            <div key={n.id} style={{
              border: `1px solid ${n.leido ? '#2a2a4e' : '#c9a84c'}`,
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem',
              backgroundColor: n.leido ? '#111111' : '#1a1a2e',
              transition: 'all 0.2s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ color: '#ffffff', margin: 0, flex: 1 }}>{n.mensaje}</p>
                {!n.leido && (
                  <span style={{ 
                    marginLeft: '1rem', color: '#c9a84c', 
                    fontWeight: 'bold', fontSize: '0.85rem',
                    backgroundColor: '#2a1a00',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    whiteSpace: 'nowrap'
                  }}>
                    ● Nueva
                  </span>
                )}
              </div>
              <small style={{ color: '#aaaaaa', marginTop: '0.5rem', display: 'block' }}>
                {formatearFecha(n.fechaCreacion)}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notificaciones