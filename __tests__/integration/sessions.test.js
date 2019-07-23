const request = require('supertest')
const faker = require('faker')

const { User } = require('../../src/app/models')

describe('Session Integration Test', () => {
  // make sure app is imported without issues
  it('Has App Defined', () => {
    expect(global.app).toBeDefined()
  })

  describe('/sessions', () => {
    it('1- should be able to authenticate with valid credentials', async () => {
      const userCreated = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456'
      })

      const response = await request(global.app)
        .post('/sessions')
        .send({
          email: userCreated.email,
          password: '123456'
        })

      expect(response.status).toBe(200)
    })

    it('2- should not be able to authenticate with invalid user', async () => {
      const response = await request(global.app)
        .post('/sessions')
        .send({
          email: 'aaaaaaaa@company.com',
          password: '999999'
        })

      expect(response.status).toBe(400)
    })

    it('3- should not be able to authenticate with invalid credentials', async () => {
      const response = await request(global.app)
        .post('/sessions')
        .send({
          email: 'test@company.com',
          password: '999999'
        })

      expect(response.status).toBe(400)
    })

    it('4- should return jwt token when authenticated', async () => {
      const userCreated = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456'
      })

      const response = await request(global.app)
        .post('/sessions')
        .send({
          email: userCreated.email,
          password: '123456'
        })

      expect(response.body).toHaveProperty('token')
    })

    it('5- should be able to access private routes when authenticated', async () => {
      const userCreated = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456'
      })

      const response = await request(global.app)
        .get('/users')
        .set('Authorization', `Bearer ${User.generateToken(userCreated)}`)

      expect(response.status).toBe(200)
    })

    it('6- should not be able to access private routes when not authenticated', async () => {
      const response = await request(global.app)
        .get('/users')
        .set('Authorization', 'Bearer 9999999')

      expect(response.status).toBe(401)
    })

    it('7- should not be able to access private routes when not authenticated', async () => {
      const response = await request(global.app)
        .get('/users')

      expect(response.status).toBe(401)
    })
  })
})
