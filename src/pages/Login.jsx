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
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Iniciar Sesión</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleLogin} style={{ padding: '0.5rem', borderRadius: '4px' }}>
          Entrar
        </button>
        <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
      </div>
    </div>
  )
}

export default Login