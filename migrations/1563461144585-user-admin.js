const mongoose = require('mongoose')
const databaseConfig = require('../src/config/database')

const User = require('../src/app/models/User')

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  mongoose.connect(databaseConfig.uri, {
    useCreateIndex: true,
    useNewUrlParser: true
  })

  const user = {
    name: 'Admin',
    email: 'admin@company.com',
    password: '123456'

  }
  const newUser = await User.create(user)
  console.log(newUser)
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down }
