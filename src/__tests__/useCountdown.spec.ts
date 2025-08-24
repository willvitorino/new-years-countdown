import { describe, it, expect } from 'vitest'
import { useCountdown } from '@/composables/useCountdown'

describe('useCountdown', () => {
  it('retorna objeto com propriedades corretas', () => {
    const result = useCountdown()
    
    expect(result).toHaveProperty('timeLeft')
    expect(result).toHaveProperty('startCountdown')
    expect(result).toHaveProperty('stopCountdown')
    expect(typeof result.startCountdown).toBe('function')
    expect(typeof result.stopCountdown).toBe('function')
  })

  it('timeLeft possui estrutura de CountdownTime', () => {
    const { timeLeft } = useCountdown()
    
    expect(timeLeft.value).toHaveProperty('days')
    expect(timeLeft.value).toHaveProperty('hours')
    expect(timeLeft.value).toHaveProperty('minutes')
    expect(timeLeft.value).toHaveProperty('seconds')
    expect(typeof timeLeft.value.days).toBe('number')
    expect(typeof timeLeft.value.hours).toBe('number')
    expect(typeof timeLeft.value.minutes).toBe('number')
    expect(typeof timeLeft.value.seconds).toBe('number')
  })

  it('valores de tempo estão dentro dos limites esperados', () => {
    const { timeLeft } = useCountdown()
    
    expect(timeLeft.value.days).toBeGreaterThanOrEqual(0)
    expect(timeLeft.value.hours).toBeGreaterThanOrEqual(0)
    expect(timeLeft.value.hours).toBeLessThan(24)
    expect(timeLeft.value.minutes).toBeGreaterThanOrEqual(0)
    expect(timeLeft.value.minutes).toBeLessThan(60)
    expect(timeLeft.value.seconds).toBeGreaterThanOrEqual(0)
    expect(timeLeft.value.seconds).toBeLessThan(60)
  })

  it('funções de controle funcionam sem erro', () => {
    const { startCountdown, stopCountdown } = useCountdown()
    
    expect(() => startCountdown()).not.toThrow()
    expect(() => stopCountdown()).not.toThrow()
    expect(() => stopCountdown()).not.toThrow() // Chamar novamente
  })

  it('calcula tempo de forma consistente', () => {
    const { timeLeft } = useCountdown()
    
    // Verificar se os valores são números válidos
    expect(Number.isInteger(timeLeft.value.days)).toBe(true)
    expect(Number.isInteger(timeLeft.value.hours)).toBe(true)
    expect(Number.isInteger(timeLeft.value.minutes)).toBe(true)
    expect(Number.isInteger(timeLeft.value.seconds)).toBe(true)
    
    // Verificar se a soma dos valores é coerente (ou todos zero, ou pelo menos um positivo)
    const totalTime = timeLeft.value.days + timeLeft.value.hours + timeLeft.value.minutes + timeLeft.value.seconds
    expect(totalTime).toBeGreaterThanOrEqual(0)
  })
})
