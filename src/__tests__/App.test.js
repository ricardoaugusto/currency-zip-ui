import axios from 'axios'
import App from '../App.vue'
import { mount, flushPromises } from '@vue/test-utils'

const successResponse = {
  result: '520BRL',
}
const errorResponse = {
  detail: 'Missing Currency to convert to.',
}

describe('App Component', () => {
  test('send a POST request and display the converted currency', async () => {
    vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: successResponse,
    })

    const wrapper = mount(App)

    await wrapper.find('[data-testid="convertCurrencyButton"]').trigger('click')

    await flushPromises()

    const responseDiv = wrapper.find('[data-testid="response"]')

    expect(responseDiv.exists()).toBe(true)
    expect(responseDiv.text()).toBe(successResponse.result)
  })

  test('display an error message if the input is invalid', async () => {
    vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        data: errorResponse,
      },
    })

    const wrapper = mount(App)

    await wrapper.find('[data-testid="convertCurrencyButton"]').trigger('click')

    await flushPromises()

    const responseDiv = wrapper.find('[data-testid="response"]')

    expect(responseDiv.exists()).toBe(true)
    expect(responseDiv.text()).toBe(errorResponse.detail)
  })
})
