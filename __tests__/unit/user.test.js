const faker = require('faker')

const { User } = require('../../src/app/models')

describe('User Unit Test', () => {
  it('1- should encrypt user password', async () => {
    const userCreated = await User.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: '123456'
    })

    const compareHash = await userCreated.compareHash('123456')

    expect(compareHash).toBe(true)
  })
})
