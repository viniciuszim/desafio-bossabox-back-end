const factory = require('../factories')

describe('User Unit Test', () => {
  it('should encrypt user password', async () => {
    const password = '123456'

    const user = await factory.create('User', {
      password: '123456'
    })

    const compareHash = await user.compareHash(password)

    expect(compareHash).toBe(true)
  })
})
