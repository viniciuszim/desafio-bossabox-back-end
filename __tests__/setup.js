require('dotenv').config({ path: '.env.test' })
const mongoose = require('mongoose')

const app = require('../src/server')

global.app = app

mongoose.connection.dropDatabase()

// beforeAll(done => {
//   // console.log('==============================1')
//   global.app = app
//   // mongoose.connect(databaseConfig.uri, {
//   //   useCreateIndex: true,
//   //   useNewUrlParser: true
//   // })
//   done()
// })

// afterAll(done => {
//   // console.log('==============================3')
//   mongoose.connection.dropDatabase(done)
//   // mongoose.connection.close()
//   done()
// })
