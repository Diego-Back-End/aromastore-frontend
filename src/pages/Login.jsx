import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/usuariosService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const credentials = {
        email: email,
        password: password
      }
      const response = await login(credentials)
      console.log('Login exitoso:', response)
      
      // Guardar token en localStorage
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      
      // Redirigir a /catalogo
      navigate('/catalogo')
    } catch (error) {
      console.error('Error en login:', error)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
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
        <p style={{ color: '#aaaaaa' }}>¿No tienes cuenta? <Link to="/registro" style={{ color: '#c9a84c' }}>Regístrate</Link></p>
      </div>
    </div>
  )
}

export default Login