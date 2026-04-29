import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Registro from './pages/Registro'
import CatalogoProductos from './pages/CatalogoProductos'
import Catalogo from './pages/Catalogo'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import MisPedidos from './pages/MisPedidos'
import Notificaciones from './pages/Notificaciones'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/catalogo-productos" element={<CatalogoProductos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mis-pedidos" element={<MisPedidos />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App