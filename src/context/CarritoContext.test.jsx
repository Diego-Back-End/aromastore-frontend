import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CarritoProvider, useCarrito } from './CarritoContext'

describe('CarritoContext', () => {
  it('debería agregar un producto al carrito', () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>
    const { result } = renderHook(() => useCarrito(), { wrapper })

    const producto = { id: 1, nombre: 'Producto 1', precio: 100, cantidad: 1 }

    act(() => {
      result.current.agregarAlCarrito(producto)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]).toEqual(producto)
  })

  it('debería incrementar la cantidad si el producto ya existe', () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>
    const { result } = renderHook(() => useCarrito(), { wrapper })

    const producto = { id: 1, nombre: 'Producto 1', precio: 100, cantidad: 1 }

    act(() => {
      result.current.agregarAlCarrito(producto)
      result.current.agregarAlCarrito(producto)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].cantidad).toBe(2)
  })

  it('debería eliminar un producto del carrito', () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>
    const { result } = renderHook(() => useCarrito(), { wrapper })

    const producto1 = { id: 1, nombre: 'Producto 1', precio: 100, cantidad: 1 }
    const producto2 = { id: 2, nombre: 'Producto 2', precio: 200, cantidad: 1 }

    act(() => {
      result.current.agregarAlCarrito(producto1)
      result.current.agregarAlCarrito(producto2)
    })

    act(() => {
      result.current.eliminarDelCarrito(1)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].id).toBe(2)
  })

  it('debería calcular el total correctamente', () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>
    const { result } = renderHook(() => useCarrito(), { wrapper })

    const producto1 = { id: 1, nombre: 'Producto 1', precio: 100, cantidad: 2 }
    const producto2 = { id: 2, nombre: 'Producto 2', precio: 50, cantidad: 1 }

    act(() => {
      result.current.agregarAlCarrito(producto1)
      result.current.agregarAlCarrito(producto2)
    })

    expect(result.current.total).toBe(250) // 100*2 + 50*1
  })

  it('debería manejar productos sin cantidad especificada', () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>
    const { result } = renderHook(() => useCarrito(), { wrapper })

    const producto = { id: 1, nombre: 'Producto 1', precio: 100 }

    act(() => {
      result.current.agregarAlCarrito(producto)
    })

    expect(result.current.items[0].cantidad).toBe(1)
  })

  it('debería calcular total como 0 cuando el carrito está vacío', () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>
    const { result } = renderHook(() => useCarrito(), { wrapper })

    expect(result.current.total).toBe(0)
  })
})
