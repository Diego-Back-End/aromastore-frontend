import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductos } from '../services/productosService'
import '../styles/CarruselPerfumes.css'

function CarruselPerfumes() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef(null)
  const autoPlayRef = useRef(null)

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProductos()
        setProductos(data.slice(0, 8))
      } catch (error) {
        console.error('Error cargando productos:', error)
        setProductos([])
      } finally {
        setLoading(false)
      }
    }
    cargarProductos()
  }, [])

  useEffect(() => {
    if (productos.length === 0 || isPaused) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productos.length)
    }, 3500)

    return () => clearInterval(autoPlayRef.current)
  }, [productos.length, isPaused])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + productos.length) % productos.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % productos.length)
  }

  const handleProductoClick = (id) => {
    navigate(`/producto/${id}`)
  }

  const formatPrice = (precio) => {
    return Number(precio).toLocaleString('es-CL')
  }

  if (loading) {
    return (
      <div className="carrusel-container">
        <div className="carrusel-loading">Cargando fragancias...</div>
      </div>
    )
  }

  if (productos.length === 0) {
    return null
  }

  return (
    <section 
      className="carrusel-section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="carrusel-title">Fragancias Destacadas</h2>
      
      <div className="carrusel-wrapper">
        <button 
          className="carrusel-nav carrusel-nav-prev" 
          onClick={goToPrevious}
          aria-label="Anterior"
        >
          ‹
        </button>

        <div className="carrusel-track" ref={carouselRef}>
          {productos.map((producto, index) => (
            <div
              key={producto.id}
              className={`carrusel-slide ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleProductoClick(producto.id)}
            >
              <div className="carrusel-card">
                <div className="carrusel-card-image">
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="carrusel-image"
                    />
                  ) : (
                    <div className="carrusel-image-placeholder">
                      <span>{producto.nombre}</span>
                    </div>
                  )}
                </div>
                <div className="carrusel-card-info">
                  <h3 className="carrusel-card-name">{producto.nombre}</h3>
                  <p className="carrusel-card-price">${formatPrice(producto.precio)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="carrusel-nav carrusel-nav-next" 
          onClick={goToNext}
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      <div className="carrusel-dots">
        {productos.map((_, index) => (
          <button
            key={index}
            className={`carrusel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default CarruselPerfumes
