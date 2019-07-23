const request = require('supertest')
const faker = require('faker')

const { User } = require('../../src/app/models')

createAndLogAnUser = async () => {
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

  return response.body
}

describe('User Integration Test', () => {
  describe('/users', () => {
    it('1- should be able to list all users', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .get('/users')
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('2- should be able to list users using filter by name', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .get(`/users?name=${userLogged.user.name}`)
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('3- should be able to show an user by a valid ID', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .get(`/users/${userLogged.user._id}`)
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('4- should not be able to show an user by an invalid ID', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .get('/users/1234567890')
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(404)
    })

    it('5- should be able to store a new user', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: '123456'
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('6- should not be able to store a new user with an existing email', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          email: userLogged.email,
          password: '123456'
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(400)
    })

    it('7- should not be able to store a new user without the field name', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/users')
        .send({
          email: faker.internet.email(),
          password: '123456'
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(400)
      expect(response.error.text).toMatch('"field":["name"]')
      expect(response.error.text).toMatch('is required')
    })

    it('8- should not be able to store a new user without the field email', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          password: '123456'
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(400)
      expect(response.error.text).toMatch('"field":["email"]')
      expect(response.error.text).toMatch('is required')
    })

    it('9- should not be able to store a new user without the field password', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email()
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(400)
      expect(response.error.text).toMatch('"field":["password"]')
      expect(response.error.text).toMatch('is required')
    })

    it('10- should be able to update an user by a valid ID', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .put(`/users/${userLogged.user._id}`)
        .send({
          name: faker.name.findName()
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('11- should not be able to update an user by an invalid ID', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .put('/users/1234567890')
        .send({
          name: faker.name.findName()
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(404)
    })

    it('12- should not be able to update an user by an existing email of another user', async () => {
      const userLogged = await createAndLogAnUser()

      const userCreated = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456'
      })

      const response = await request(global.app)
        .put(`/users/${userCreated._id}`)
        .send({
          name: faker.name.findName(),
          email: userLogged.user.email
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(400)
    })

    it('13- should be able to update the email if it not belong an other user', async () => {
      const userLogged = await createAndLogAnUser()

      const userCreated = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456'
      })

      const response = await request(global.app)
        .put(`/users/${userCreated._id}`)
        .send({
          email: faker.internet.email()
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('14- should be able to delete an user by a valid ID', async () => {
      const userLogged = await createAndLogAnUser()

      const userCreated = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456'
      })

      const response = await request(global.app)
        .delete(`/users/${userCreated._id}`)
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('15- should not be able to delete an user by an invalid ID', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .delete('/users/1234567890')
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(404)
    })
  })
})
