import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { AppCounter } from '@/components'

describe('AppCounter', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppCounter)
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('h2 title should be "Counter" by default', () => {
    expect(wrapper.find('h2').text()).toBe('Counter')
  })

  it("should display '150' in the paragraph", () => {
    const counterValue = wrapper.find('[data-testid="counter"]')

    expect(counterValue.text()).toBe('150')
  })

  it('should increment counter by 1 when button is clicked', async () => {
    const buttonIncrease = wrapper.find('button')
    await buttonIncrease.trigger('click')

    const counterValue = wrapper.find('[data-testid="counter"]')

    expect(counterValue.text()).toBe('151')
  })

  it('should decrement counter by 1 when button is clicked', async () => {
    const buttonDecrease = wrapper.findAll('button')[1]
    await buttonDecrease.trigger('click')

    const counterValue = wrapper.find('[data-testid="counter"]')

    expect(counterValue.text()).toBe('149')
  })

  it('should increment and decrement the counter', async () => {
    const [buttonIncrease, buttonDecrease] = wrapper.findAll('button')

    await buttonIncrease.trigger('click')

    let counterValue = wrapper.find('[data-testid="counter"]')

    expect(counterValue.text()).toBe('151')

    await buttonDecrease.trigger('click')

    counterValue = wrapper.find('[data-testid="counter"]')

    expect(counterValue.text()).toBe('150')
  })

  it('should have a default value of 150', () => {
    const { start } = wrapper.vm.$options.props
    expect(start.default).toBe(150)
  })

  it('should render the title prop', () => {
    const title = 'New Counter'
    const wrapper = shallowMount(AppCounter, {
      props: {
        title
      }
    })

    expect(wrapper.find('h2').text()).toBe(title)
  })
})
