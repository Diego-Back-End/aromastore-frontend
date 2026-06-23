import { useNavigate } from 'react-router-dom'

function Contacto() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            backgroundColor: 'transparent', 
            color: '#c9a84c', 
            border: '1px solid #c9a84c', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            marginBottom: '2rem' 
          }}
        >
          ← Volver
        </button>

        <h1 style={{ color: '#c9a84c', marginBottom: '2rem', fontSize: '2rem' }}>
          Contacto
        </h1>

        <div style={{ 
          backgroundColor: '#1a1a2e', 
          border: '1px solid #c9a84c', 
          borderRadius: '12px', 
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#c9a84c', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            Información de Contacto
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem', color: '#c9a84c', minWidth: '30px' }}>✉</span>
              <div>
                <p style={{ color: '#aaaaaa', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Email</p>
                <p style={{ color: '#ffffff', fontSize: '1.1rem' }}>contacto@aromastore.cl</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem', color: '#c9a84c', minWidth: '30px' }}>☎</span>
              <div>
                <p style={{ color: '#aaaaaa', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Teléfono</p>
                <p style={{ color: '#ffffff', fontSize: '1.1rem' }}>+56 9 1234 5678</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem', color: '#c9a84c', minWidth: '30px' }}>📍</span>
              <div>
                <p style={{ color: '#aaaaaa', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Dirección</p>
                <p style={{ color: '#ffffff', fontSize: '1.1rem' }}>Santiago, Chile</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem', color: '#c9a84c', minWidth: '30px' }}>🕐</span>
              <div>
                <p style={{ color: '#aaaaaa', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Horario de Atención</p>
                <p style={{ color: '#ffffff', fontSize: '1.1rem' }}>Lunes a Viernes, 9:00 - 18:00 hrs</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#1a1a2e', 
          border: '1px solid #c9a84c', 
          borderRadius: '12px', 
          padding: '2rem'
        }}>
          <h2 style={{ color: '#c9a84c', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            Síguenos en Redes Sociales
          </h2>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                backgroundColor: '#c9a84c', 
                color: '#0a0a0a', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#d4b85c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#c9a84c'}
            >
              <span>📷</span> Instagram
            </a>

            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                backgroundColor: '#c9a84c', 
                color: '#0a0a0a', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#d4b85c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#c9a84c'}
            >
              <span>📘</span> Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto
