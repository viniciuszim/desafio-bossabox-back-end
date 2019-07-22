const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.get('/', (req, res) => {
  res.send('Server is running...')
})

// Session's Routes
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))

// Force all routes below to use authentication
routes.use(authMiddleware)

// Tool's Routes
routes.get('/tools', handle(controllers.ToolController.index))
routes.get('/tools/:id', handle(controllers.ToolController.show))
routes.post('/tools', validate(validators.Tool), handle(controllers.ToolController.store))
routes.put('/tools/:id', validate(validators.Tool), handle(controllers.ToolController.update))
routes.delete('/tools/:id', handle(controllers.ToolController.destroy))

// User's Routes
routes.get('/users', handle(controllers.UserController.index))
routes.get('/users/:id', handle(controllers.UserController.show))
routes.post('/users', validate(validators.User), handle(controllers.UserController.store))
routes.put('/users/:id', handle(controllers.UserController.update))
routes.delete('/users/:id', handle(controllers.UserController.destroy))

module.exports = routes
