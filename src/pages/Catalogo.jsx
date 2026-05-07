import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductos } from '../services/productosService'

function Catalogo() {
  const [productos, setProductos] = useState([])
  const navigate = useNavigate()

  // Obtener productos del backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const datos = await getProductos()
        setProductos(datos)
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }
    fetchProductos()
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