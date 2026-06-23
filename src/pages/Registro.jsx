import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/usuariosService'

function Registro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const navigate = useNavigate()

  // Validation states
  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    password: ''
  })
  const [touched, setTouched] = useState({
    nombre: false,
    email: false,
    password: false
  })

  // Validation functions
  const validateNombre = (value) => {
    if (!value.trim()) {
      return 'El nombre es requerido'
    }
    if (value.trim().length < 3) {
      return 'El nombre debe tener al menos 3 caracteres'
    }
    return ''
  }

  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'El email es requerido'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Formato de email inválido'
    }
    return ''
  }

  const validatePassword = (value) => {
    if (!value) {
      return 'La contraseña es requerida'
    }
    if (value.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres'
    }
    if (!/[A-Z]/.test(value)) {
      return 'La contraseña debe incluir al menos una mayúscula'
    }
    if (!/[0-9]/.test(value)) {
      return 'La contraseña debe incluir al menos un número'
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return 'La contraseña debe incluir al menos un carácter especial'
    }
    return ''
  }

  const getPasswordStrength = (value) => {
    if (!value) return 0
    let strength = 0
    if (value.length >= 8) strength += 1
    if (/[A-Z]/.test(value)) strength += 1
    if (/[0-9]/.test(value)) strength += 1
    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength += 1
    if (value.length >= 12) strength += 1
    return strength
  }

  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0: return 'Muy débil'
      case 1: return 'Débil'
      case 2: return 'Regular'
      case 3: return 'Buena'
      case 4: return 'Fuerte'
      case 5: return 'Muy fuerte'
      default: return ''
    }
  }

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0: return '#ff4444'
      case 1: return '#ff8800'
      case 2: return '#ffcc00'
      case 3: return '#aaff00'
      case 4: return '#44ff00'
      case 5: return '#00ff88'
      default: return '#555555'
    }
  }

  const isFormValid = () => {
    return (
      validateNombre(nombre) === '' &&
      validateEmail(email) === '' &&
      validatePassword(password) === '' &&
      aceptaTerminos
    )
  }

  const handleNombreChange = (e) => {
    const value = e.target.value
    setNombre(value)
    if (touched.nombre) {
      setErrors({ ...errors, nombre: validateNombre(value) })
    }
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (touched.email) {
      setErrors({ ...errors, email: validateEmail(value) })
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    if (touched.password) {
      setErrors({ ...errors, password: validatePassword(value) })
    }
  }

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
    if (field === 'nombre') {
      setErrors({ ...errors, nombre: validateNombre(nombre) })
    } else if (field === 'email') {
      setErrors({ ...errors, email: validateEmail(email) })
    } else if (field === 'password') {
      setErrors({ ...errors, password: validatePassword(password) })
    }
  }

  const handleRegistro = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    const nombreError = validateNombre(nombre)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    
    setErrors({
      nombre: nombreError,
      email: emailError,
      password: passwordError
    })
    setTouched({
      nombre: true,
      email: true,
      password: true
    })

    if (nombreError || emailError || passwordError) {
      return
    }

    try {
      const formData = {
        nombre: nombre,
        email: email,
        password: password,
        rol: 'CLIENTE'
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
          <div>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={handleNombreChange}
              onBlur={() => handleBlur('nombre')}
              style={{ 
                width: '100%',
                padding: '0.75rem', 
                borderRadius: '4px', 
                border: errors.nombre ? '1px solid #ff4444' : '1px solid #1a1a2e', 
                backgroundColor: '#1a1a2e', 
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
            {errors.nombre && (
              <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.nombre}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => handleBlur('email')}
              style={{ 
                width: '100%',
                padding: '0.75rem', 
                borderRadius: '4px', 
                border: errors.email ? '1px solid #ff4444' : '1px solid #1a1a2e', 
                backgroundColor: '#1a1a2e', 
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
            {errors.email && (
              <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('password')}
              style={{ 
                width: '100%',
                padding: '0.75rem', 
                borderRadius: '4px', 
                border: errors.password ? '1px solid #ff4444' : '1px solid #1a1a2e', 
                backgroundColor: '#1a1a2e', 
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
            {password && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  marginBottom: '0.25rem'
                }}>
                  <div style={{ 
                    flex: 1, 
                    height: '4px', 
                    backgroundColor: '#333333',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${(getPasswordStrength(password) / 5) * 100}%`,
                      height: '100%',
                      backgroundColor: getStrengthColor(getPasswordStrength(password)),
                      transition: 'width 0.3s ease, background-color 0.3s ease'
                    }} />
                  </div>
                  <span style={{ 
                    color: getStrengthColor(getPasswordStrength(password)), 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    minWidth: '60px'
                  }}>
                    {getStrengthLabel(getPasswordStrength(password))}
                  </span>
                </div>
              </div>
            )}
            {errors.password && (
              <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.password}</p>
            )}
          </div>

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
            disabled={!isFormValid()}
            style={{ 
              padding: '0.75rem', 
              borderRadius: '4px', 
              backgroundColor: isFormValid() ? '#c9a84c' : '#555555', 
              color: '#000000', 
              fontWeight: 'bold', 
              border: 'none', 
              cursor: isFormValid() ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease'
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