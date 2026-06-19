import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  }

  const linkHoverStyle = {
    color: '#c9a84c'
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{ display: 'flex', gap: '2rem', padding: '1rem 2rem', background: '#0d0d0d', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#c9a84c', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.5rem', marginRight: '2rem' }}>
        AromaStore
      </Link>
      <Link to="/" style={{ ...linkStyle, fontSize: '1rem' }} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Inicio</Link>
      <Link to="/carrito" style={{ ...linkStyle, fontSize: '1rem' }} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Carrito</Link>
      <Link to="/catalogo-productos" style={{ ...linkStyle, fontSize: '1rem' }} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Catálogo de Productos</Link>
      
      {usuario ? (
        <>
          <Link to="/mis-pedidos" style={{ ...linkStyle, fontSize: '1rem' }} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Mis Pedidos</Link>
          <Link to="/perfil" style={{ ...linkStyle, fontSize: '1rem' }} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Mi Perfil</Link>
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'transparent', 
              border: '1px solid #c9a84c', 
              color: '#c9a84c', 
              padding: '0.5rem 1rem', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#c9a84c'
              e.target.style.color = '#000000'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.color = '#c9a84c'
            }}
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
        <Link to="/login" style={{ ...linkStyle, fontSize: '1rem' }} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Login</Link>
      )}
    </nav>
  )
}

export default Navbar