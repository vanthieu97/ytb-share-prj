const bcrypt = require('bcrypt')
const { getHash } = require('./utils')

describe('utils', () => {
  test('getHash', async () => {
    const hash = await getHash('12345678')
    expect(await bcrypt.compare('12345678', hash)).toBe(true)
    expect(await bcrypt.compare('12345679', hash)).toBe(false)
  })
})
