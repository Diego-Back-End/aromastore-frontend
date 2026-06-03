import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductos } from '../services/productosService'
import '../styles/CatalogoProductos.css'

function CatalogoProductos() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [cargando, setCargando] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true)
        const data = await getProductos()
        setProductos(data)
        setProductosFiltrados(data)
      } catch (error) {
        console.error('Error cargando productos:', error)
        setProductos([])
        setProductosFiltrados([])
      } finally {
        setCargando(false)
      }
    }
    cargarProductos()
  }, [])

  useEffect(() => {
    let filtrados = productos

    if (busqueda) {
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      )
    }

    if (categoriaSeleccionada !== 'todas') {
      filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada)
    }

    setProductosFiltrados(filtrados)
  }, [busqueda, categoriaSeleccionada, productos])

  const verDetalles = (id) => {
    navigate(`/producto/${id}`)
  }

  const obtenerPrecioConDescuento = (producto) => {
    if (producto.descuento > 0) {
      return (producto.precio * (1 - producto.descuento / 100)).toFixed(2)
    }
    return producto.precio.toFixed(2)
  }

  const obtenerCategoriasUnicas = () => {
    const categorias = [...new Set(productos.map(p => p.categoria))]
    return categorias.filter(c => c)
  }

  if (cargando) {
    return (
      <div className="catalogo-container">
        <div className="loading">Cargando productos...</div>
      </div>
    )
  }

  return (
    <div className="catalogo-container">
      <div className="catalogo-header">
        <h1 className="catalogo-title">Catálogo de Productos</h1>
        
        <div className="filtros-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="busqueda-input"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="categoria-select"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {obtenerCategoriasUnicas().map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="no-resultados">
          <p>No se encontraron productos</p>
        </div>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map((producto) => (
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
                {producto.marca && (
                  <p className="producto-marca">{producto.marca}</p>
                )}
                
                <h3 className="producto-nombre">{producto.nombre}</h3>

                <p className="producto-descripcion">
                  {producto.descripcion}
                </p>

                {producto.calificacion && (
                  <div className="producto-calificacion">
                    {'★'.repeat(Math.floor(producto.calificacion))}
                    {'☆'.repeat(5 - Math.floor(producto.calificacion))}
                  </div>
                )}

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
      )}
    </div>
  )
}

export default CatalogoProductos
