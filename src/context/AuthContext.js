import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar token desde localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      // Aquí se haría la petición al backend
      // const response = await usuariosService.login(credentials);
      // const { token, user } = response.data;
      
      // Por ahora, simulamos la respuesta
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          email: credentials.email,
          nombre: 'Usuario Test'
        }
      };
      
      const { token: newToken, user: userData } = mockResponse;
      
      // Guardar en estado
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Guardar en localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  // Función para registrarse
  const register = async (userData) => {
    try {
      // Aquí se haría la petición al backend
      // const response = await usuariosService.register(userData);
      // const { token, user } = response.data;
      
      // Por ahora, simulamos la respuesta
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 2,
          email: userData.email,
          nombre: userData.nombre
        }
      };
      
      const { token: newToken, user: newUser } = mockResponse;
      
      // Guardar en estado
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Guardar en localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: error.message };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Limpiar estado
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Función para verificar si el token es válido
  const checkAuth = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Aquí se podría verificar si el token sigue siendo válido
      // haciendo una petición al backend
      return true;
    }
    return false;
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
