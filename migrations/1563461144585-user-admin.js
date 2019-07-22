const mongoose = require('mongoose')
const databaseConfig = require('../src/config/database')

const User = require('../src/app/models/User')

const userMock = {
  name: 'Admin',
  email: 'admin@company.com',
  password: '123456'
}

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  mongoose.connect(databaseConfig.uri, {
    useCreateIndex: true,
    useNewUrlParser: true
  })

  await User.create(userMock)
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
  mongoose.connect(databaseConfig.uri, {
    useCreateIndex: true,
    useNewUrlParser: true
  })

  await User.findOneAndDelete({ email: userMock.email })
}

module.exports = { up, down }
