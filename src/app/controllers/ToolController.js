const Tool = require('../models/Tool')
const User = require('../models/User')
const NewToolMail = require('../jobs/NewToolMail')
const Queue = require('../services/Queue')

class ToolController {
  async index (req, res) {
    const filters = {}

    if (req.query.q) {
      filters.title = new RegExp(req.query.q, 'i')
    }
    if (req.query.tag) {
      filters.tags = new RegExp(req.query.tag, 'i')
    }

    const tools = await Tool.find(filters)
    // se quiser usar paginação
    // const tools = await Tool.paginate(filters, {
    //   page: req.query.page || 1,
    //   limit: 20,
    //   sort: 'createdAt'
    // })

    return res.json(tools)
  }

  async show (req, res) {
    try {
      const tool = await Tool.findById(req.params.id)

      if (!tool) {
        return res.status(404).json({ error: 'Tool not found' })
      }

      return res.json(tool)
    } catch (error) {
      return res.status(404).json({ error: 'Tool not found' })
    }
  }

  async store (req, res) {
    const tool = await Tool.create({ ...req.body, user: req.userId })

    const user = await User.findById(req.userId)

    Queue.create(NewToolMail.key, {
      user,
      tool
    }).save()

    return res.status(201).json(tool)
  }

  async update (req, res) {
    try {
      const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })

      if (!tool) {
        return res.status(404).json({ error: 'Tool not found' })
      }

      return res.json(tool)
    } catch (error) {
      return res.status(404).json({ error: 'Tool not found' })
    }
  }

  async destroy (req, res) {
    try {
      const tool = await Tool.findByIdAndDelete(req.params.id)

      if (!tool) {
        return res.status(404).json({ error: 'Tool not found' })
      }

      return res.send()
    } catch (error) {
      return res.status(404).json({ error: 'Tool not found' })
    }
  }
}

module.exports = new ToolController()
