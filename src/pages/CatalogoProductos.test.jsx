import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CatalogoProductos from './CatalogoProductos'
import { getProductos } from '../services/productosService'

// Mock the API service
vi.mock('../services/productosService')

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('CatalogoProductos', () => {
  const mockProductos = [
    {
      id: 1,
      nombre: 'Perfume A',
      descripcion: 'Descripción del perfume A',
      precio: 100,
      categoria: 'perfumes',
      descuento: 10,
      imagen: 'imagen1.jpg',
      calificacion: 4.5,
      marca: 'Marca A'
    },
    {
      id: 2,
      nombre: 'Crema B',
      descripcion: 'Descripción de la crema B',
      precio: 50,
      categoria: 'cremas',
      descuento: 0,
      imagen: null,
      calificacion: 3.5,
      marca: 'Marca B'
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería mostrar estado de carga inicialmente', () => {
    getProductos.mockImplementation(() => new Promise(() => {}))
    
    render(<CatalogoProductos />)
    
    expect(screen.getByText('Cargando productos...')).toBeInTheDocument()
  })

  it('debería mostrar productos después de cargar', async () => {
    getProductos.mockResolvedValue(mockProductos)
    
    render(<CatalogoProductos />)
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Perfume A' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Crema B' })).toBeInTheDocument()
    })
  })

  it('debería filtrar productos por búsqueda', async () => {
    getProductos.mockResolvedValue(mockProductos)
    
    render(<CatalogoProductos />)
    
    await waitFor(() => {
      expect(screen.getByText('Perfume A')).toBeInTheDocument()
    })
    
    const searchInput = screen.getByPlaceholderText('Buscar productos...')
    await userEvent.type(searchInput, 'Perfume')
    
    await waitFor(() => {
      expect(screen.getByText('Perfume A')).toBeInTheDocument()
      expect(screen.queryByText('Crema B')).not.toBeInTheDocument()
    })
  })

  it('debería mostrar mensaje cuando no hay resultados', async () => {
    getProductos.mockResolvedValue(mockProductos)
    
    render(<CatalogoProductos />)
    
    await waitFor(() => {
      expect(screen.getByText('Perfume A')).toBeInTheDocument()
    })
    
    const searchInput = screen.getByPlaceholderText('Buscar productos...')
    await userEvent.type(searchInput, 'ProductoInexistente')
    
    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos')).toBeInTheDocument()
    })
  })

  it('debería mostrar badge de descuento cuando el producto tiene descuento', async () => {
    getProductos.mockResolvedValue(mockProductos)
    
    render(<CatalogoProductos />)
    
    await waitFor(() => {
      expect(screen.getByText('-10%')).toBeInTheDocument()
    })
  })

  it('debería mostrar placeholder cuando no hay imagen', async () => {
    getProductos.mockResolvedValue(mockProductos)
    
    render(<CatalogoProductos />)
    
    await waitFor(() => {
      expect(screen.getByTestId('placeholder-crema-b')).toBeInTheDocument()
    })
  })
})
