import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  const usuarioId = localStorage.getItem('usuarioId')

  if (!token || !usuarioId) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute