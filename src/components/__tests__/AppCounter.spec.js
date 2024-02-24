import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppCounterVue from '../AppCounter.vue'

describe('AppCounter', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(AppCounterVue)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('h2 title should be "Counter" by default', () => {
    const wrapper = shallowMount(AppCounterVue)

    expect(wrapper.find('h2').text()).toBe('Counter')
  })
})
