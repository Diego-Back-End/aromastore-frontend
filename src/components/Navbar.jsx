import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#1a1a2e' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
      <Link to="/carrito" style={{ color: 'white', textDecoration: 'none' }}>Carrito</Link>
      <Link to="/mis-pedidos" style={{ color: 'white', textDecoration: 'none' }}>Mis Pedidos</Link>
      <Link to="/notificaciones" style={{ color: 'white', textDecoration: 'none' }}>Notificaciones</Link>
      <Link to="/catalogo-productos" style={{ color: 'white', textDecoration: 'none' }}>Catálogo de Productos</Link>
      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
    </nav>
  )
}

export default Navbar