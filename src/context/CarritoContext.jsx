import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const agregarAlCarrito = (producto) => {
    setItems(prev => {
      const existe = prev.find(item => item.id === producto.id)
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { ...producto, cantidad: producto.cantidad || 1 }]
    })
  }

  const eliminarDelCarrito = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  return (
    <CarritoContext.Provider value={{ items, agregarAlCarrito, eliminarDelCarrito, total }}>
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => useContext(CarritoContext)
