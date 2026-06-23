import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Perfil() {
  const navigate = useNavigate()
  const { usuario, logout } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  const nombre = usuario?.nombre || 'Usuario'
  const email = usuario?.email || ''
  const rol = usuario?.rol || ''
  const usuarioId = usuario?.id

  useEffect(() => {
    if (!usuarioId) return
    const cargarPedidos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/pedidos/usuario/${usuarioId}`)
        const data = await response.json()
        setPedidos(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setCargando(false)
      }
    }
    cargarPedidos()
  }, [usuarioId])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const colorEstado = (estado) => {
    if (estado === 'ENTREGADO') return '#4ade80'
    if (estado === 'ENVIADO') return '#fbbf24'
    return '#9ca3af'
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', border: '1px solid #c9a84c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#000', marginBottom: '1rem' }}>
              {nombre.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ color: '#ffffff', margin: 0 }}>{nombre}</h2>
            <p style={{ color: '#aaaaaa', margin: '0.25rem 0' }}>{email}</p>
            <span style={{ color: '#c9a84c', fontSize: '0.85rem', backgroundColor: '#2a1a00', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
              {rol}
            </span>
          </div>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: 'transparent', color: '#ff4444', border: '1px solid #ff4444', borderRadius: '4px', cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>

        <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>Mis Compras</h2>

        {cargando ? (
          <p style={{ color: '#aaaaaa' }}>Cargando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <div style={{ backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '2rem', textAlign: 'center', border: '1px solid #2a2a4e' }}>
            <p style={{ color: '#aaaaaa', marginBottom: '1rem' }}>Aún no has realizado compras</p>
            <button onClick={() => navigate('/catalogo-productos')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#c9a84c', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ver Catálogo
            </button>
          </div>
        ) : (
          pedidos.map(p => (
            <div key={p.id} style={{ border: '1px solid #2a2a4e', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', backgroundColor: '#1a1a2e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: '#ffffff', fontWeight: 'bold' }}>Pedido #{p.id}</p>
                <span style={{ color: colorEstado(p.estado), fontWeight: 'bold', backgroundColor: '#0d0d0d', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                  {p.estado}
                </span>
              </div>
              <p style={{ color: '#aaaaaa' }}>Fecha: {new Date(p.fechaCreacion).toLocaleDateString('es-CL')}</p>
              {p.items && p.items.map((item, idx) => (
                <div key={idx} style={{ marginTop: '0.5rem' }}>
                  <p style={{ color: '#aaaaaa' }}>Producto ID: {item.productoId}</p>
                  <p style={{ color: '#aaaaaa' }}>Cantidad: {item.cantidad}</p>
                  <p style={{ color: '#aaaaaa' }}>Precio Unitario: ${item.precioUnitario?.toLocaleString()}</p>
                </div>
              ))}
              <p style={{ color: '#c9a84c', fontWeight: 'bold' }}>Total: ${p.total.toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Perfil