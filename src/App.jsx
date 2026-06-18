import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Catalogo from './pages/Catalogo'
import CatalogoProductos from './pages/CatalogoProductos'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import MisPedidos from './pages/MisPedidos'
import Notificaciones from './pages/Notificaciones'
import Perfil from './pages/Perfil'
import Terminos from './pages/Terminos'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/catalogo-productos" element={<CatalogoProductos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route path="/mis-pedidos" element={
            <PrivateRoute>
              <MisPedidos />
            </PrivateRoute>
          } />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/perfil" element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          } />
          <Route path="/terminos" element={<Terminos />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App