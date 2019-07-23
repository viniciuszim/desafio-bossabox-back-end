const User = require('../models/User')

class UserController {
  async index (req, res) {
    const filters = {}

    if (req.query.name) {
      filters.name = new RegExp(req.query.name, 'i')
    }

    const users = await User.find(filters)

    return res.json(users)
  }

  async show (req, res) {
    try {
      const user = await User.findById(req.params.id)

      return res.json(user)
    } catch (error) {
      return res.status(404).json({ error: 'User not found' })
    }
  }

  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }

  async update (req, res) {
    try {
      const { email } = req.body

      if (await User.findOne({ email }) && req.userId !== req.params.id) {
        return res.status(400).json({ error: 'E-mail already used' })
      }

      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })

      return res.json(user)
    } catch (error) {
      return res.status(404).json({ error: 'User not found' })
    }
  }

  async destroy (req, res) {
    try {
      await User.findByIdAndDelete(req.params.id)

      return res.send()
    } catch (error) {
      return res.status(404).json({ error: 'User not found' })
    }
  }
}

module.exports = new UserController()
