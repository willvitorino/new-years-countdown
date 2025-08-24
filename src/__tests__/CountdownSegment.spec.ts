import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CountdownSegment from '@/components/CountdownSegment.vue'

describe('CountdownSegment', () => {
  it('renderiza corretamente com props básicas', () => {
    const wrapper = mount(CountdownSegment, {
      props: {
        number: 5,
        label: 'Dias'
      }
    })

    expect(wrapper.find('.countdown-segment').exists()).toBe(true)
    expect(wrapper.find('.number').text()).toBe('05')
    expect(wrapper.find('.label').text()).toBe('Dias')
  })

  it('formata números menores que 10 com zero à esquerda', () => {
    const wrapper = mount(CountdownSegment, {
      props: {
        number: 7,
        label: 'Horas'
      }
    })

    expect(wrapper.find('.number').text()).toBe('07')
  })

  it('não adiciona zero à esquerda para números maiores ou iguais a 10', () => {
    const wrapper = mount(CountdownSegment, {
      props: {
        number: 15,
        label: 'Minutos'
      }
    })

    expect(wrapper.find('.number').text()).toBe('15')
  })

  it('atualiza o número quando a prop muda', async () => {
    const wrapper = mount(CountdownSegment, {
      props: {
        number: 5,
        label: 'Segundos'
      }
    })

    expect(wrapper.find('.number').text()).toBe('05')

    await wrapper.setProps({ number: 12 })
    expect(wrapper.find('.number').text()).toBe('12')
  })

  it('mantém a label inalterada quando apenas o número muda', async () => {
    const wrapper = mount(CountdownSegment, {
      props: {
        number: 1,
        label: 'Dias'
      }
    })

    const labelText = wrapper.find('.label').text()
    await wrapper.setProps({ number: 10 })
    
    expect(wrapper.find('.label').text()).toBe(labelText)
  })

  it('renderiza corretamente com número zero', () => {
    const wrapper = mount(CountdownSegment, {
      props: {
        number: 0,
        label: 'Horas'
      }
    })

    expect(wrapper.find('.number').text()).toBe('00')
  })

  it('possui estrutura HTML correta', () => {
    const wrapper = mount(CountdownSegment, {
      props: {
        number: 25,
        label: 'Minutos'
      }
    })

    expect(wrapper.find('.countdown-segment').exists()).toBe(true)
    expect(wrapper.find('.number-container').exists()).toBe(true)
    expect(wrapper.find('.number').exists()).toBe(true)
    expect(wrapper.find('.label').exists()).toBe(true)
  })

  it('possui transition configurada corretamente', () => {
    const wrapper = mount(CountdownSegment, {
      props: {
        number: 1,
        label: 'Segundos'
      }
    })

    const transition = wrapper.findComponent({ name: 'Transition' })
    expect(transition.exists()).toBe(true)
    expect(transition.props('name')).toBe('flip')
    expect(transition.props('mode')).toBe('out-in')
  })
})
