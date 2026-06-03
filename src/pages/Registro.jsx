import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/usuariosService'

function Registro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('CLIENTE')
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const navigate = useNavigate()

  const handleRegistro = async (e) => {
    e.preventDefault()
    try {
      const formData = {
        nombre: nombre,
        email: email,
        password: password,
        rol: rol
      }
      console.log('Registro:', formData)
      await register(formData)
      console.log('Usuario registrado exitosamente')
      navigate('/login')
    } catch (error) {
      console.error('Error en registro:', error)
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
        <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}>Crear Cuenta</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #1a1a2e', backgroundColor: '#1a1a2e', color: '#ffffff' }}
          />
          <select
            value={rol}
            onChange={e => setRol(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #1a1a2e', backgroundColor: '#1a1a2e', color: '#ffffff' }}
          >
            <option value="CLIENTE">CLIENTE</option>
            <option value="ADMIN">ADMIN</option>
          </select>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="terminos"
              checked={aceptaTerminos}
              onChange={e => setAceptaTerminos(e.target.checked)}
              style={{ cursor: 'pointer', accentColor: '#c9a84c', width: '16px', height: '16px' }}
            />
            <label htmlFor="terminos" style={{ color: '#aaaaaa', fontSize: '0.9rem' }}>
              Acepto los{' '}
              <a href="/terminos" target="_blank" style={{ color: '#c9a84c' }}>
                términos y condiciones
              </a>
            </label>
          </div>
          <button 
            onClick={handleRegistro} 
            disabled={!aceptaTerminos}
            style={{ 
              padding: '0.5rem', borderRadius: '4px', 
              backgroundColor: aceptaTerminos ? '#c9a84c' : '#555555', 
              color: '#000000', fontWeight: 'bold', border: 'none', 
              cursor: aceptaTerminos ? 'pointer' : 'not-allowed' 
            }}
          >
            Registrarse
          </button>
          <p style={{ color: '#aaaaaa' }}>¿Ya tienes cuenta? <Link to="/login" style={{ color: '#c9a84c' }}>Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Registro