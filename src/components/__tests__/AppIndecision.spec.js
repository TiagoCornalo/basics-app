import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { AppIndecision } from '@/components'

describe('AppIndecision', () => {
  let wrapper;
  let getAnswerMock;

  vi.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve({
        "answer": "yes",
        "forced": false,
        "image": "https://yesno.wtf/assets/yes/2.gif"
      })
    })
  })

  beforeEach(() => {
    wrapper = shallowMount(AppIndecision)

    getAnswerMock = vi.spyOn(wrapper.vm, 'getAnswer')
  })

  afterEach(() => {
    getAnswerMock.mockRestore()
  })


  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not fire http request when writing', () => {
    const input = wrapper.find('input')
    input.setValue('Hello')

    expect(getAnswerMock).not.toHaveBeenCalled()
  })

  it('should fire http request when writing "?" symbol', async () => {
    const input = wrapper.find('input')
    await input.setValue('Hello?')

    expect(getAnswerMock).toHaveBeenCalled(1)
  })

  describe('getAnswer', () => {

    it('should return an answer and an image', async () => {
      await wrapper.vm.getAnswer()

      expect(wrapper.vm.answer).toBe('Sí!')
      expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
    })

    it('api fails', async () => {
      fetch.mockImplementationOnce(() => Promise.reject('API is down'))

      await wrapper.vm.getAnswer()

      expect(wrapper.vm.answer).toBe('Ups! Algo salió mal')
      expect(wrapper.vm.img).toBeFalsy()
    })
  })
})