const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

// Session's Routes
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))

// User's Routes
routes.post('/users', validate(validators.User), handle(controllers.UserController.store))

// Force all routes below to use authentication
routes.use(authMiddleware)

// Tool's Routes
routes.get('/tools', handle(controllers.ToolController.index))
routes.get('/tools/:id', handle(controllers.ToolController.show))
routes.post('/tools', validate(validators.Tool), handle(controllers.ToolController.store))
routes.put('/tools/:id', validate(validators.Tool), handle(controllers.ToolController.update))
routes.delete('/tools/:id', handle(controllers.ToolController.destroy))

module.exports = routes
