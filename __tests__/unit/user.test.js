const { User } = require('../../src/app/models')

describe('User Unit Test', () => {
  it('should encrypt user password', async () => {
    const password = '123456'

    const user = await User.create({
      name: 'User',
      email: 'test2@company.com',
      password
    })

    const compareHash = await user.compareHash(password)

    expect(compareHash).toBe(true)
  })
})
