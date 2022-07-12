import { getErrorMsg } from './utility'

describe('utility', () => {
  test('getErrorMsg', () => {
    expect(getErrorMsg()).toEqual('Error')
    expect(getErrorMsg({ msg: 'Test' })).toEqual('Test')
    expect(getErrorMsg({ response: { data: { msg: 'Test' } } })).toEqual('Test')
  })
})
