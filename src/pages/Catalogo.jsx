import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductos } from '../services/productosService'
import '../styles/Catalogo.css'

function Catalogo() {
  const navigate = useNavigate()
  const [productosDestacados, setProductosDestacados] = useState([])

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const datos = await getProductos()
        console.log(datos)
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }

    fetchProductos()

    // Productos destacados
    setProductosDestacados([
      {
        id: 1,
        nombre: 'Amphora Noir',
        marca: 'AromaStore',
        precio: 299.90,
        descripcion: 'Fragancia oscura y elegante con notas de vainilla y ámbar',
        descuento: 0
      },
      {
        id: 2,
        nombre: 'Savage Elite',
        marca: 'AromaStore',
        precio: 189.90,
        descripcion: 'Intensidad extrema con notas de lavanda y especias orientales',
        descuento: 15
      },
      {
        id: 3,
        nombre: 'Ariana Gold',
        marca: 'AromaStore',
        precio: 245.00,
        descripcion: 'Lujo floral con toques dorados y pétalos de rosa',
        descuento: 0
      },
      {
        id: 4,
        nombre: 'Aura Mist',
        marca: 'AromaStore',
        precio: 156.50,
        descripcion: 'Frescura etérea con notas cítricas y musgo blanco',
        descuento: 20
      }
    ])
  }, [])

  const verDetalles = (id) => {
    navigate(`/producto/${id}`)
  }

  const irAlCatalogo = () => {
    navigate('/catalogo-productos')
  }

  const obtenerPrecioConDescuento = (producto) => {
    if (producto.descuento > 0) {
      return (producto.precio * (1 - producto.descuento / 100)).toFixed(2)
    }
    return producto.precio.toFixed(2)
  }

  return (
    <div className="catalogo-home">
      {/* HERO SECTION PREMIUM */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Perfumes Premium de Lujo</h1>

              <p className="hero-subtitle">
                Descubre fragancias exclusivas que definen tu esencia
              </p>

              <div className="hero-buttons">
                <button
                  className="hero-btn hero-btn-primary"
                  onClick={irAlCatalogo}
                >
                  Ver Catálogo
                </button>

                <button
                  className="hero-btn hero-btn-secondary"
                  onClick={irAlCatalogo}
                >
                  Explorar Colección
                </button>
              </div>
            </div>

            <div className="hero-image-container">
              <div className="hero-image-placeholder">
                <span className="placeholder-text">AromaStore</span>
              </div>
              <div className="hero-image-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="destacados-section">
        <div className="section-header">
          <h2 className="section-title">Fragancias Destacadas</h2>

          <p className="section-subtitle">
            Nuestra selección de perfumes exclusivos
          </p>
        </div>

        <div className="productos-grid">
          {productosDestacados.map((producto) => (
            <article key={producto.id} className="producto-card">
              <div className="producto-imagen-container">
                {producto.imagen ? (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="producto-imagen"
                  />
                ) : (
                  <div className="producto-imagen-placeholder">
                    <span className="placeholder-text">{producto.nombre}</span>
                  </div>
                )}

                {producto.descuento > 0 && (
                  <span className="descuento-badge">
                    -{producto.descuento}%
                  </span>
                )}
              </div>

              <div className="producto-info">
                <h3 className="producto-nombre">{producto.nombre}</h3>

                <p className="producto-descripcion">
                  {producto.descripcion}
                </p>

                <div className="producto-precio">
                  {producto.descuento > 0 ? (
                    <>
                      <span className="precio-original">
                        ${producto.precio.toFixed(2)}
                      </span>

                      <span className="precio-descuento">
                        ${obtenerPrecioConDescuento(producto)}
                      </span>
                    </>
                  ) : (
                    <span className="precio-actual">
                      ${producto.precio.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  className="producto-btn"
                  onClick={() => verDetalles(producto.id)}
                >
                  Ver Detalle
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="beneficios-section">
        <div className="section-header">
          <h2 className="section-title">
            Por Qué Elegir AromaStore
          </h2>

          <p className="section-subtitle">
            La experiencia premium que mereces
          </p>
        </div>

        <div className="beneficios-grid">
          <div className="beneficio-card">
            <div className="beneficio-icon">🚚</div>

            <h3 className="beneficio-titulo">
              Envíos Rápidos
            </h3>

            <p className="beneficio-descripcion">
              Recibe tus perfumes en 24-48 horas en todo el país
            </p>
          </div>

          <div className="beneficio-card">
            <div className="beneficio-icon">🌸</div>

            <h3 className="beneficio-titulo">
              Perfumes Originales
            </h3>

            <p className="beneficio-descripcion">
              100% auténticos y exclusivos
            </p>
          </div>

          <div className="beneficio-card">
            <div className="beneficio-icon">💎</div>

            <h3 className="beneficio-titulo">
              Calidad Premium
            </h3>

            <p className="beneficio-descripcion">
              Ingredientes de alta calidad y duración excepcional
            </p>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="promo-banner">
        <div className="promo-content">
          <div className="promo-text">
            <h2 className="promo-title">
              Oferta Exclusiva
            </h2>

            <p className="promo-subtitle">
              Hasta 40% de descuento en selecciones premium
            </p>

            <p className="promo-tiempo">
              Tiempo limitado • Aprovecha ahora
            </p>
          </div>

          <button
            className="promo-btn"
            onClick={irAlCatalogo}
          >
            Comprar Ahora
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-home">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">AromaStore</h3>

            <p className="footer-slogan">
              Fragancias que definen tu esencia
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Enlaces</h4>

              <a href="/catalogo-productos">
                Catálogo
              </a>

              <a href="/nosotros">
                Nosotros
              </a>

              <a href="/contacto">
                Contacto
              </a>
            </div>

            <div className="footer-column">
              <h4>Servicios</h4>

              <a href="/envios">
                Envíos
              </a>

              <a href="/devoluciones">
                Devoluciones
              </a>

              <a href="/garantia">
                Garantía
              </a>
            </div>

            <div className="footer-column">
              <h4>Síguenos</h4>

              <div className="social-links">
                <a href="#">📘</a>
                <a href="#">📷</a>
                <a href="#">🐦</a>
                <a href="#">📱</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © 2026 AromaStore. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Catalogo