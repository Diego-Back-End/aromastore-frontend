import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Registro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('CLIENTE')
  const navigate = useNavigate()

  const handleRegistro = () => {
    const formData = {
      nombre: nombre,
      email: email,
      password: password,
      rol: rol
    }
    console.log('Registro:', formData)
    navigate('/login')
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Crear Cuenta</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          value={rol}
          onChange={e => setRol(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="CLIENTE">CLIENTE</option>
          <option value="ADMIN">ADMIN</option>
        </select>
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
        <button onClick={handleRegistro} style={{ padding: '0.5rem', borderRadius: '4px' }}>
          Registrarse
        </button>
        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  )
}

export default Registro