import { useParams, useNavigate } from 'react-router-dom'

function DetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Datos de prueba hasta que el MS esté listo
  const productos = {
    1: { nombre: 'Perfume Noir', precio: 29990, descripcion: 'Fragancia oscura y elegante', ml: '100ml' },
    2: { nombre: 'Acqua Fresh', precio: 19990, descripcion: 'Fresco y ligero', ml: '50ml' },
    3: { nombre: 'Rose Gold', precio: 34990, descripcion: 'Floral con toques dulces', ml: '75ml' },
  }

  const producto = productos[id]

  if (!producto) return <h2>Producto no encontrado</h2>

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate(-1)}>← Volver</button>
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <p><strong>Tamaño:</strong> {producto.ml}</p>
      <p><strong>Precio:</strong> ${producto.precio.toLocaleString()}</p>
      <button onClick={() => navigate('/carrito')}>Agregar al carrito 🛒</button>
    </div>
  )
}

export default DetalleProducto