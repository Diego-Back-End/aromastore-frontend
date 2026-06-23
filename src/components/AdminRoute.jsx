import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  const usuarioStr = localStorage.getItem('usuario')
  
  if (!usuarioStr) {
    return <Navigate to="/" replace />
  }

  const usuario = JSON.parse(usuarioStr)
  
  if (usuario.rol !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
