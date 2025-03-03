const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { categories } = require('../config/static')

const articleSchema = new mongoose.Schema({
  title: { type: String, required() { return this.type == 1} },
  intro: { type: String, required() { return this.type ==1 } },
  content: { type: String, required() { return this.type == 1} },
  category: { 
    type: String, 
    required() { return this. type ==1 },
    enum: categories.map(cate => cate.key)
  },
  status: { 
    type: Number, 
    enum: [0, 1],
    default: 0
  },
  tags: [{
    type: ObjectId,
    required: true
  }],
  page_view: { type: Number, default: 0 },
  created_by: { type: ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

const Model = mongoose.model('articles', articleSchema)

module.exports = Model
