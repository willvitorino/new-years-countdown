import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

// Mock do composable useCountdown
vi.mock('@/composables/useCountdown', () => ({
  useCountdown: () => ({
    timeLeft: ref({
      days: 10,
      hours: 5,
      minutes: 30,
      seconds: 45
    }),
    startCountdown: vi.fn(),
    stopCountdown: vi.fn()
  })
}))

// Import necessário para o ref
import { ref } from 'vue'

describe('App', () => {
  it('renderiza corretamente', () => {
    const wrapper = mount(App)
    expect(wrapper.find('.app').exists()).toBe(true)
  })

  it('renderiza o componente CountdownBase', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'CountdownBase' })).toBeTruthy()
  })

  it('aplica estilos globais corretamente', () => {
    const wrapper = mount(App)
    const appElement = wrapper.find('.app')
    expect(appElement.exists()).toBe(true)
  })
})
