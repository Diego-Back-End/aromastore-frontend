import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/usuariosService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login: contextLogin } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await login({ email, password })
      if (response.token && response.usuario) {
        contextLogin(response.usuario, response.token, response.usuario.id)
        if (response.usuario.rol === 'ADMIN') {
          navigate('/admin/productos')
        } else {
          navigate('/perfil')
        }
      }
    } catch (error) {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '420px', 
        padding: '2.5rem', 
        backgroundColor: '#1a1a2e', 
        borderRadius: '12px',
        border: '1px solid #c9a84c'
      }}>
        <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}>Iniciar Sesión</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #1a1a2e', backgroundColor: '#1a1a2e', color: '#ffffff' }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #1a1a2e', backgroundColor: '#1a1a2e', color: '#ffffff' }}
          />
          <button onClick={handleLogin} style={{ padding: '0.5rem', borderRadius: '4px', backgroundColor: '#c9a84c', color: '#000000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            Entrar
          </button>
          {error && <p style={{ color: '#ff4444' }}>{error}</p>}
          <p style={{ color: '#aaaaaa' }}>¿No tienes cuenta? <Link to="/registro" style={{ color: '#c9a84c' }}>Regístrate</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login