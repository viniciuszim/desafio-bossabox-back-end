const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ToolSChema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ToolSChema.plugin(mongoosePaginate)

module.exports = mongoose.model('Tool', ToolSChema)
