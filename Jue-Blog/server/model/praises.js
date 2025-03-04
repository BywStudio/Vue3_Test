const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types


const praisesSchema = new mongoose.Schema({
  // 文章或沸点 ID
  target_id: { type: ObjectId, required: true },
  target_type: {
    type: Number,
    enum: [1, 2], // 1 表示文章，2 表示沸点
    required: true
  },
  // 目标用户 ID
  target_user: { type: ObjectId, required: true },
  // 1 表示点赞，2 表示收藏
  type: {
    type: Number,
    enum: [1, 2],
    default: 1,
    required: true
  },
  created_by: { type: ObjectId, required: true },
  created_at: { type: Date, default: Date.now }
})

const Model = mongoose.model('praises', praisesSchema)

module.exports = Model