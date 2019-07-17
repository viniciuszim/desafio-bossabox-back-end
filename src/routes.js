const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.get('/', (req, res) => {
  return res.send('Server is running...')
})

// Session's Routes
routes.post('/sessions', controllers.SessionController.store)

// User's Routes
routes.post('/users', controllers.UserController.store)

module.exports = routes
