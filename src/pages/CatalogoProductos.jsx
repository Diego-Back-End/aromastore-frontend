import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/CatalogoProductos.css'

// Importar imágenes locales de perfumes
import amphora from '../assets/perfumes/amphora.webp'
import savage from '../assets/perfumes/savage.webp'
import arianaGrande from '../assets/perfumes/ariana-grande.webp'
import aura from '../assets/perfumes/aura.webp'
import bharara from '../assets/perfumes/bharara-king.webp'
import hotBlossom from '../assets/perfumes/hot-blossom.webp'
import hotSensation from '../assets/perfumes/hot-sensation.webp'
import sublime from '../assets/perfumes/sublime.webp'
import theIcon from '../assets/perfumes/the-icon.webp'

const CatalogoProductos = () => {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos')
  const [precioMin, setPrecioMin] = useState('')
  const [precioMax, setPrecioMax] = useState('')
  const [ordenamiento, setOrdenamiento] = useState('nombre')
  const [cargando, setCargando] = useState(true)
  const [carrito, setCarrito] = useState([])
  const [vistaRapida, setVistaRapida] = useState(null)

  // Datos de ejemplo para perfumes premium
  const perfumesEjemplo = [
    {
      id: 1,
      nombre: "amphora",
      marca: "amphora",
      categoria: "femenino",
      precio: 125.99,
      descripcion: "Icono de la elegancia femenina con notas de jazmín y rosa",
      imagen: amphora,
      stock: 15,
      calificacion: 4.8,
      descuento: 0
    },
    {
      id: 2,
      nombre: "Savage Elixir",
      marca: "Dior",
      categoria: "masculino",
      precio: 189.99,
      descripcion: "Intensidad extrema con notas de lavanda y especias",
      imagen: savage,
      stock: 8,
      calificacion: 4.9,
      descuento: 10
    },
    {
      id: 3,
      nombre: "arianaGrande",
      marca: "Tom Ford",
      categoria: "unisex",
      precio: 245.00,
      descripcion: "Lujo oscuro y misterioso con notas de orquídea negra",
      imagen: arianaGrande,
      stock: 12,
      calificacion: 4.7,
      descuento: 0
    },
    {
      id: 4,
      nombre: "La Vie Est Belle",
      marca: "Lancôme",
      categoria: "femenino",
      precio: 98.50,
      descripcion: "Felicidad en una botella con notas de iris y vainilla",
      imagen: aura,
      stock: 20,
      calificacion: 4.6,
      descuento: 15
    },
    {
      id: 5,
      nombre: "Bleu de Chanel",
      marca: "Chanel",
      categoria: "masculino",
      precio: 156.00,
      descripcion: "Frescura woody con notas de cítricos y madera de cedro",
      imagen: bharara,
      stock: 18,
      calificacion: 4.8,
      descuento: 0
    },
    {
      id: 6,
      nombre: "Good Girl",
      marca: "Carolina Herrera",
      categoria: "femenino",
      precio: 112.00,
      descripcion: "Dulzura rebelde con notas de tuberosa y jazmín",
      imagen: hotBlossom,
      stock: 25,
      calificacion: 4.5,
      descuento: 20
    },
    {
      id: 7,
      nombre: "Acqua di Gio",
      marca: "Giorgio Armani",
      categoria: "masculino",
      precio: 89.99,
      descripcion: "Frescura marina con notas de bergamota y musgo",
      imagen: hotSensation,
      stock: 30,
      calificacion: 4.4,
      descuento: 5
    },
    {
      id: 8,
      nombre: "Flowerbomb",
      marca: "Viktor&Rolf",
      categoria: "femenino",
      precio: 134.99,
      descripcion: "Explosión floral con notas de orquídea y freesia",
      imagen: sublime,
      stock: 14,
      calificacion: 4.7,
      descuento: 0
    },
    {
      id: 9,
      nombre: "theIcon",
      marca: "Viktor&Rolf",
      categoria: "masculino",
      precio: 134.99,
      descripcion: "Explosión floral con notas de orquídea y freesia",
      imagen: theIcon,
      stock: 14,
      calificacion: 4.7,
      descuento: 0
    }
  ]

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setProductos(perfumesEjemplo)
      setProductosFiltrados(perfumesEjemplo)
      setCargando(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filtrarProductos()
  }, [busqueda, categoriaSeleccionada, precioMin, precioMax, ordenamiento, productos])

  const filtrarProductos = () => {
    let filtrados = [...productos]

    // Filtrar por búsqueda
    if (busqueda) {
      filtrados = filtrados.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      )
    }

    // Filtrar por categoría
    if (categoriaSeleccionada !== 'todos') {
      filtrados = filtrados.filter(producto => producto.categoria === categoriaSeleccionada)
    }

    // Filtrar por precio
    if (precioMin) {
      filtrados = filtrados.filter(producto => producto.precio >= parseFloat(precioMin))
    }
    if (precioMax) {
      filtrados = filtrados.filter(producto => producto.precio <= parseFloat(precioMax))
    }

    // Ordenar
    switch (ordenamiento) {
      case 'nombre':
        filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      case 'precio-asc':
        filtrados.sort((a, b) => a.precio - b.precio)
        break
      case 'precio-desc':
        filtrados.sort((a, b) => b.precio - a.precio)
        break
      case 'calificacion':
        filtrados.sort((a, b) => b.calificacion - a.calificacion)
        break
      default:
        break
    }

    setProductosFiltrados(filtrados)
  }

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto])
    // Aquí podrías agregar una notificación
  }

  const verDetalles = (producto) => {
    navigate(`/producto/${producto.id}`)
  }

  const abrirVistaRapida = (producto) => {
    setVistaRapida(producto)
  }

  const cerrarVistaRapida = () => {
    setVistaRapida(null)
  }

  const obtenerPrecioConDescuento = (producto) => {
    if (producto.descuento > 0) {
      return (producto.precio * (1 - producto.descuento / 100)).toFixed(2)
    }
    return producto.precio.toFixed(2)
  }

  const renderizarEstrellas = (calificacion) => {
    const estrellas = []
    const calificacionRedondeada = Math.round(calificacion)
    
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span key={i} className={`estrella ${i <= calificacionRedondeada ? 'llena' : 'vacia'}`}>
          ★
        </span>
      )
    }
    
    return estrellas
  }

  if (cargando) {
    return (
      <div className="catalogo-container">
        <div className="cargando">
          <div className="spinner"></div>
          <p>Cargando catálogo de perfumes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="catalogo-container">
      {/* Header del catálogo */}
      <header className="catalogo-header">
        <div className="header-content">
          <h1>Catálogo de Perfumes Premium</h1>
          <p>Descubre nuestra exclusiva colección de fragancias de lujo</p>
        </div>
      </header>

      {/* Filtros y búsqueda */}
      <section className="filtros-section">
        <div className="filtros-container">
          {/* Barra de búsqueda */}
          <div className="busqueda-container">
            <input
              type="text"
              placeholder="Buscar perfumes, marcas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="busqueda-input"
            />
            <button className="busqueda-btn">🔍</button>
          </div>

          {/* Filtros avanzados */}
          <div className="filtros-avanzados">
            <div className="filtro-group">
              <label htmlFor="categoria">Categoría:</label>
              <select
                id="categoria"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="filtro-select"
              >
                <option value="todos">Todos</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div className="filtro-group">
              <label htmlFor="precio-min">Precio Mín:</label>
              <input
                type="number"
                id="precio-min"
                placeholder="0"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
                className="filtro-input"
              />
            </div>

            <div className="filtro-group">
              <label htmlFor="precio-max">Precio Máx:</label>
              <input
                type="number"
                id="precio-max"
                placeholder="500"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
                className="filtro-input"
              />
            </div>

            <div className="filtro-group">
              <label htmlFor="orden">Ordenar por:</label>
              <select
                id="orden"
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value)}
                className="filtro-select"
              >
                <option value="nombre">Nombre</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="calificacion">Mejor Calificados</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="resultados-section">
        <div className="resultados-header">
          <h2>Perfumes Encontrados ({productosFiltrados.length})</h2>
          <div className="vista-controles">
            <button className="vista-btn active">Grid</button>
            <button className="vista-btn">Lista</button>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="productos-grid">
          {productosFiltrados.map((producto) => (
            <article key={producto.id} className="producto-card">
              <div className="producto-imagen-container">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                  onError={(e) => {
                    e.target.src = placeholderImage
                  }}
                />
                {producto.descuento > 0 && (
                  <span className="descuento-badge">-{producto.descuento}%</span>
                )}
                <div className="producto-acciones">
                  <button
                    className="accion-btn vista-rapida-btn"
                    onClick={() => abrirVistaRapida(producto)}
                    title="Vista rápida"
                  >
                    👁️
                  </button>
                  <button
                    className="accion-btn favorito-btn"
                    title="Agregar a favoritos"
                  >
                    ❤️
                  </button>
                </div>
              </div>

              <div className="producto-info">
                <div className="producto-marca">{producto.marca}</div>
                <h3 className="producto-nombre">{producto.nombre}</h3>
                <p className="producto-descripcion">{producto.descripcion}</p>
                
                <div className="producto-calificacion">
                  {renderizarEstrellas(producto.calificacion)}
                  <span className="calificacion-numero">({producto.calificacion})</span>
                </div>

                <div className="producto-precio">
                  {producto.descuento > 0 ? (
                    <>
                      <span className="precio-original">${producto.precio.toFixed(2)}</span>
                      <span className="precio-descuento">${obtenerPrecioConDescuento(producto)}</span>
                    </>
                  ) : (
                    <span className="precio-actual">${producto.precio.toFixed(2)}</span>
                  )}
                </div>

                <div className="producto-stock">
                  {producto.stock > 10 ? (
                    <span className="stock-disponible">✓ En stock</span>
                  ) : producto.stock > 0 ? (
                    <span className="stock-limitado">⚠️ Últimas {producto.stock} unidades</span>
                  ) : (
                    <span className="stock-agotado">✗ Agotado</span>
                  )}
                </div>

                <div className="producto-botones">
                  <button
                    className="btn btn-primary"
                    onClick={() => agregarAlCarrito(producto)}
                    disabled={producto.stock === 0}
                  >
                    {producto.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => verDetalles(producto)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="no-resultados">
            <h3>No se encontraron perfumes</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </section>

      {/* Footer del catálogo */}
      <footer className="catalogo-footer">
        <div className="footer-content">
          <p>© 2024 AromaStore - Perfumes Premium de Lujo</p>
          <div className="footer-links">
            <a href="/about">Sobre Nosotros</a>
            <a href="/contact">Contacto</a>
            <a href="/shipping">Envíos</a>
            <a href="/returns">Devoluciones</a>
          </div>
        </div>
      </footer>

      {/* Modal de Vista Rápida */}
      {vistaRapida && (
        <div className="vista-rapida-modal" onClick={cerrarVistaRapida}>
          <div className="vista-rapida-content" onClick={(e) => e.stopPropagation()}>
            <button className="vista-rapida-cerrar" onClick={cerrarVistaRapida}>
              ✕
            </button>
            <div className="vista-rapida-imagen-container">
              <img
                src={vistaRapida.imagen}
                alt={vistaRapida.nombre}
                className="vista-rapida-imagen"
              />
            </div>
            <div className="vista-rapida-info">
              <h3>{vistaRapida.nombre}</h3>
              <p className="vista-rapida-marca">{vistaRapida.marca}</p>
              <p className="vista-rapida-descripcion">{vistaRapida.descripcion}</p>
              <div className="vista-rapida-precio">
                ${vistaRapida.precio.toFixed(2)}
              </div>
              <div className="vista-rapida-botones">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    agregarAlCarrito(vistaRapida)
                    cerrarVistaRapida()
                  }}
                >
                  Agregar al Carrito
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    verDetalles(vistaRapida)
                    cerrarVistaRapida()
                  }}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CatalogoProductos