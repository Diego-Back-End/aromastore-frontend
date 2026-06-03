import { useNavigate } from 'react-router-dom'
import '../styles/Catalogo.css'

function Catalogo() {
  const navigate = useNavigate()

  const irAlCatalogo = () => {
    navigate('/catalogo-productos')
  }

  return (
    <div style={{ width: '100%' }}>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div style={{ position:'absolute', width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#c9a84c', top:'20%', left:'15%', animation:'float1 4s ease-in-out infinite' }}></div>
        <div style={{ position:'absolute', width:'5px', height:'5px', borderRadius:'50%', backgroundColor:'#c9a84c', top:'60%', left:'25%', animation:'float2 6s ease-in-out infinite' }}></div>
        <div style={{ position:'absolute', width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'#c9a84c', top:'30%', right:'20%', animation:'float3 5s ease-in-out infinite' }}></div>
        <div style={{ position:'absolute', width:'6px', height:'6px', borderRadius:'50%', backgroundColor:'#c9a84c', top:'70%', right:'30%', animation:'float1 7s ease-in-out infinite' }}></div>
        <div style={{ position:'absolute', width:'4px', height:'4px', borderRadius:'50%', backgroundColor:'#c9a84c', top:'45%', left:'60%', animation:'float2 5s ease-in-out infinite' }}></div>
        <div style={{ position:'absolute', width:'7px', height:'7px', borderRadius:'50%', backgroundColor:'#c9a84c', top:'80%', left:'45%', animation:'float3 8s ease-in-out infinite' }}></div>
        <div className="hero-content">
          <h1 className="hero-title">AromaStore</h1>
          <h2 className="hero-subtitle">Perfumes Premium de Lujo</h2>
          <p className="hero-description">
            Descubre fragancias exclusivas que definen tu esencia
          </p>
          <div className="hero-buttons">
            <button className="hero-btn-primary" onClick={irAlCatalogo}>
              Ver Catálogo
            </button>
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS SECTION */}
      <section className="about-section">
        <h2 className="about-title">Por Qué Elegir AromaStore</h2>
        <div className="about-cards">
          <div className="about-card">
            <div className="about-icon">✦</div>
            <h3 className="about-card-title">Envíos Rápidos</h3>
            <p className="about-card-description">
              Recibe tus perfumes en 24-48 horas en todo el país
            </p>
          </div>
          <div className="about-card">
            <div className="about-icon">◆</div>
            <h3 className="about-card-title">Perfumes Originales</h3>
            <p className="about-card-description">
              100% auténticos y exclusivos
            </p>
          </div>
          <div className="about-card">
            <div className="about-icon">★</div>
            <h3 className="about-card-title">Calidad Premium</h3>
            <p className="about-card-description">
              Ingredientes de alta calidad y duración excepcional
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3 className="footer-logo">AromaStore</h3>
        <p className="footer-slogan">Fragancias que definen tu esencia</p>
        <div className="footer-links">
          <a href="/catalogo-productos" className="footer-link">Catálogo</a>
          <a href="/contacto" className="footer-link">Contacto</a>
          <a href="/terminos" className="footer-link">Términos y Condiciones</a>
        </div>
        <div className="footer-copyright">
          © 2026 AromaStore
        </div>
      </footer>
    </div>
  )
}

export default Catalogo