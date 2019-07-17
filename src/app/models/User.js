const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserSChema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSChema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8)
})

UserSChema.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

UserSChema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}

module.exports = mongoose.model('User', UserSChema)
