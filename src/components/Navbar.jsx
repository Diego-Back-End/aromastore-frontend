import { Link } from 'react-router-dom'

function Navbar() {
  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  }

  const linkHoverStyle = {
    color: '#c9a84c'
  }

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#0d0d0d', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#c9a84c', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.5rem', marginRight: '2rem' }}>
        AromaStore
      </Link>
      <Link to="/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Inicio</Link>
      <Link to="/carrito" style={linkStyle} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Carrito</Link>
      <Link to="/mis-pedidos" style={linkStyle} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Mis Pedidos</Link>
      <Link to="/notificaciones" style={linkStyle} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Notificaciones</Link>
      <Link to="/catalogo-productos" style={linkStyle} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Catálogo de Productos</Link>
      <Link to="/login" style={linkStyle} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>Login</Link>
    </nav>
  )
}

export default Navbar