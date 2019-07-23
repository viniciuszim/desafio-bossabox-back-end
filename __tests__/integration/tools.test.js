const request = require('supertest')
const faker = require('faker')

const { Tool, User } = require('../../src/app/models')

let i = 0

createAndLogAnUser = async () => {
  const userCreated = await User.create({
    name: faker.name.findName(),
    email: `${i++}${faker.internet.email()}`,
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

createTool = async user => {
  const toolCreated = await Tool.create({
    title: faker.lorem.word(),
    link: faker.internet.url(),
    description: faker.lorem.paragraph(),
    tags: faker.lorem.words().split(' '),
    user: user._id
  })

  return toolCreated
}

describe('Tool Integration Test', () => {
  describe('/tools', () => {
    it('1- should be able to list all tools', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .get('/tools')
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('2- should be able to list tools using filter by title', async () => {
      const userLogged = await createAndLogAnUser()
      const toolCreated = await createTool(userLogged.user)

      const response = await request(global.app)
        .get(`/tools?q=${toolCreated.title}`)
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('3- should be able to list tools using filter by tag', async () => {
      const userLogged = await createAndLogAnUser()
      const toolCreated = await createTool(userLogged.user)

      const response = await request(global.app)
        .get(`/tools?tag=${toolCreated.tags[0]}`)
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('4- should be able to show a tool by a valid ID', async () => {
      const userLogged = await createAndLogAnUser()
      const toolCreated = await createTool(userLogged.user)

      const response = await request(global.app)
        .get(`/tools/${toolCreated._id}`)
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('5- should not be able to show a tool by an invalid ID', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .get('/tools/1234567890')
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(404)
    })

    it('6- should be able to store a new tool', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/tools')
        .send({
          title: faker.lorem.word(),
          link: faker.internet.url(),
          description: faker.lorem.paragraph(),
          tags: faker.lorem.words().split(' ')
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(201)
    })

    it('7- should not be able to store a new tool without the field title', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/tools')
        .send({
          link: faker.internet.url(),
          description: faker.lorem.paragraph(),
          tags: faker.lorem.words().split(' ')
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(400)
      expect(response.error.text).toMatch('"field":["title"]')
      expect(response.error.text).toMatch('is required')
    })

    it('8- should not be able to store a new tool without the field link', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/tools')
        .send({
          title: faker.lorem.word(),
          description: faker.lorem.paragraph(),
          tags: faker.lorem.words().split(' ')
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(400)
      expect(response.error.text).toMatch('"field":["link"]')
      expect(response.error.text).toMatch('is required')
    })

    it('9- should not be able to store a new tool without the field description', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/tools')
        .send({
          title: faker.lorem.word(),
          link: faker.internet.url(),
          tags: faker.lorem.words().split(' ')
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(400)
      expect(response.error.text).toMatch('"field":["description"]')
      expect(response.error.text).toMatch('is required')
    })

    it('10- should not be able to store a new tool without the field tags', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .post('/tools')
        .send({
          title: faker.lorem.word(),
          link: faker.internet.url(),
          description: faker.lorem.paragraph()
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(400)
      expect(response.error.text).toMatch('"field":["tags"]')
      expect(response.error.text).toMatch('is required')
    })

    it('11- should be able to update a tool by a valid ID', async () => {
      const userLogged = await createAndLogAnUser()
      const toolCreated = await createTool(userLogged.user)

      const response = await request(global.app)
        .put(`/tools/${toolCreated._id}`)
        .send({
          title: faker.lorem.word()
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('12- should not be able to update a tool by an invalid ID', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .put('/tools/1234567890')
        .send({
          title: faker.lorem.word()
        })
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(404)
    })

    it('13- should be able to delete a tool by a valid ID', async () => {
      const userLogged = await createAndLogAnUser()
      const toolCreated = await createTool(userLogged.user)

      const response = await request(global.app)
        .delete(`/tools/${toolCreated._id}`)
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(200)
    })

    it('14- should not be able to delete a tool by an invalid ID', async () => {
      const userLogged = await createAndLogAnUser()

      const response = await request(global.app)
        .delete('/tools/1234567890')
        .set('Authorization', `Bearer ${userLogged.token}`)

      expect(response.status).toBe(404)
    })
  })
})
