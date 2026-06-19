import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [token, setToken] = useState(null)
  const [usuarioId, setUsuarioId] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUsuarioId = localStorage.getItem('usuarioId')
    const usuarioGuardado = localStorage.getItem('usuario')
    
    if (storedToken && storedUsuarioId) {
      setToken(storedToken)
      setUsuarioId(storedUsuarioId)
      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado))
      }
    }
    
    setCargando(false)
  }, [])

  const login = (userData, authToken, authUsuarioId) => {
    localStorage.setItem('token', authToken)
    localStorage.setItem('usuarioId', authUsuarioId)
    localStorage.setItem('usuario', JSON.stringify(userData))
    setToken(authToken)
    setUsuarioId(authUsuarioId)
    setUsuario(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuarioId')
    localStorage.removeItem('usuario')
    setToken(null)
    setUsuarioId(null)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, token, usuarioId, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
