import { mount } from '@vue/test-utils'
import { convertCurrency } from '../src/App'

describe('convertCurrency', () => {
  it('should set response value on successful API call', async () => {
    const axiosMock = {
      post: jest.fn(() =>
        Promise.resolve({ data: { result: 'Converted value' } }),
      ),
    }

    const currencyString = { value: '1000USD + 5000BRL to EUR' }
    const whenString = { value: '20240502' }

    await convertCurrency({ axios: axiosMock, currencyString, whenString })

    expect(currencyString.value).toBe('1000USD + 5000BRL to EUR')
    expect(whenString.value).toBe('20240502')
    expect(axiosMock.post).toHaveBeenCalledWith(expect.any(String), {
      currency: '1000USD + 5000BRL to EUR',
      when: '20240502',
    })
    expect(response.value).toBe('Converted value')
    expect(hasError.value).toBe(false)
  })

  it('should set error response on failed API call', async () => {
    const axiosMock = {
      post: jest.fn(() => Promise.reject(new Error('Network Error'))),
    }

    const currencyString = { value: '1000USD + 5000BRL to EUR' }
    const whenString = { value: '20240502' }

    await convertCurrency({ axios: axiosMock, currencyString, whenString })

    expect(currencyString.value).toBe('1000USD + 5000BRL to EUR')
    expect(whenString.value).toBe('20240502')
    expect(axiosMock.post).toHaveBeenCalledWith(expect.any(String), {
      currency: '1000USD + 5000BRL to EUR',
      when: '20240502',
    })
    expect(response.value).toBe('Network Error')
    expect(hasError.value).toBe(true)
  })
})
