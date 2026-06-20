import { describe, it, expect } from 'vitest'

describe('Validaciones del formulario de registro', () => {
  const validateNombre = (value) => {
    if (!value.trim()) {
      return 'El nombre es requerido'
    }
    if (value.trim().length < 3) {
      return 'El nombre debe tener al menos 3 caracteres'
    }
    return ''
  }

  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'El email es requerido'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Formato de email inválido'
    }
    return ''
  }

  const validatePassword = (value) => {
    if (!value) {
      return 'La contraseña es requerida'
    }
    if (value.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres'
    }
    if (!/[A-Z]/.test(value)) {
      return 'La contraseña debe incluir al menos una mayúscula'
    }
    if (!/[0-9]/.test(value)) {
      return 'La contraseña debe incluir al menos un número'
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return 'La contraseña debe incluir al menos un carácter especial'
    }
    return ''
  }

  describe('validateNombre', () => {
    it('debería retornar error cuando el nombre está vacío', () => {
      expect(validateNombre('')).toBe('El nombre es requerido')
    })

    it('debería retornar error cuando el nombre tiene menos de 3 caracteres', () => {
      expect(validateNombre('ab')).toBe('El nombre debe tener al menos 3 caracteres')
    })

    it('debería retornar vacío cuando el nombre es válido', () => {
      expect(validateNombre('Juan')).toBe('')
    })

    it('debería ignorar espacios en blanco al inicio y final', () => {
      expect(validateNombre('  Juan  ')).toBe('')
    })
  })

  describe('validateEmail', () => {
    it('debería retornar error cuando el email está vacío', () => {
      expect(validateEmail('')).toBe('El email es requerido')
    })

    it('debería retornar error para formato de email inválido', () => {
      expect(validateEmail('invalido')).toBe('Formato de email inválido')
      expect(validateEmail('invalido@')).toBe('Formato de email inválido')
      expect(validateEmail('@dominio.com')).toBe('Formato de email inválido')
    })

    it('debería retornar vacío para email válido', () => {
      expect(validateEmail('usuario@dominio.com')).toBe('')
      expect(validateEmail('test.email@dominio.co')).toBe('')
    })
  })

  describe('validatePassword', () => {
    it('debería retornar error cuando la contraseña está vacía', () => {
      expect(validatePassword('')).toBe('La contraseña es requerida')
    })

    it('debería retornar error cuando la contraseña tiene menos de 8 caracteres', () => {
      expect(validatePassword('Abc1!')).toBe('La contraseña debe tener al menos 8 caracteres')
    })

    it('debería retornar error cuando falta mayúscula', () => {
      expect(validatePassword('abc1234!')).toBe('La contraseña debe incluir al menos una mayúscula')
    })

    it('debería retornar error cuando falta número', () => {
      expect(validatePassword('Abcdefgh!')).toBe('La contraseña debe incluir al menos un número')
    })

    it('debería retornar error cuando falta carácter especial', () => {
      expect(validatePassword('Abcdefgh1')).toBe('La contraseña debe incluir al menos un carácter especial')
    })

    it('debería retornar vacío para contraseña válida', () => {
      expect(validatePassword('Abc12345!')).toBe('')
    })
  })
})
