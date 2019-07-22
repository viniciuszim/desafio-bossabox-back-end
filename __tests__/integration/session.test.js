const request = require('supertest')

const { User } = require('../../src/app/models')

const userMock = {
  name: 'User Test',
  email: 'test@company.com',
  password: '123456'
}

let userCreated = null

describe('Session Integration Test', () => {
  beforeAll(async done => {
    userCreated = await User.create(userMock)
    done()
  })

  // make sure app is imported without issues
  it('Has App Defined', () => {
    expect(global.app).toBeDefined()
  })

  describe('/sessions', () => {
    it('should be able to authenticate with valid credentials', async () => {
      const response = await request(global.app)
        .post('/sessions')
        .send(userMock)

      expect(response.status).toBe(200)
    })

    it('should not be able to authenticate with invalid credentials', async () => {
      const response = await request(global.app)
        .post('/sessions')
        .send({
          email: 'test@company.com',
          password: '999999'
        })

      expect(response.status).toBe(400)
    })

    it('should return jwt token when authenticated', async () => {
      const response = await request(global.app)
        .post('/sessions')
        .send(userMock)

      expect(response.body).toHaveProperty('token')
    })

    it('should be able to access private routes when authenticated', async () => {
      const response = await request(global.app)
        .get('/users')
        .set('Authorization', `Bearer ${User.generateToken(userCreated)}`)

      expect(response.status).toBe(200)
    })

    it('should not be able to access private routes when not authenticated', async () => {
      const response = await request(global.app)
        .get('/users')

      expect(response.status).toBe(401)
    })

    it('should not be able to access private routes when not authenticated', async () => {
      const response = await request(global.app)
        .get('/users')
        .set('Authorization', 'Bearer 9999999')

      expect(response.status).toBe(401)
    })
  })
})
