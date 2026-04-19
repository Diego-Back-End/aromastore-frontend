import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Catalogo() {
  const [productos, setProductos] = useState([])
  const navigate = useNavigate()

  // Datos de prueba hasta que el MS esté listo
  useEffect(() => {
    setProductos([
      { id: 1, nombre: 'Perfume Noir', precio: 29990, descripcion: 'Fragancia oscura y elegante' },
      { id: 2, nombre: 'Acqua Fresh', precio: 19990, descripcion: 'Fresco y ligero' },
      { id: 3, nombre: 'Rose Gold', precio: 34990, descripcion: 'Floral con toques dulces' },
    ])
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Catálogo de Perfumes</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {productos.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px', borderRadius: '8px' }}>
            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>
            <p><strong>${p.precio.toLocaleString()}</strong></p>
            <button onClick={() => navigate(`/producto/${p.id}`)}>Ver detalle</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalogo