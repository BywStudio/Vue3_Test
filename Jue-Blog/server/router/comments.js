const express = require('express')
const router = express.Router()

const CommsModel = require('../model/comments')
const UsersModel = require('../model/users')
const MessModel = require('../model/messages')

const { filterJson } = require('../utils/index')

router.all('/', (req, res) => {
  res.send('评论 API')
})
// 评论接口
router.post('/create', async (req, res, next) => {
  let body =req.body
  try{
    let { target_user, type } = body
    let result = await CommsModel.create(body)
    // 新增添加消息
    await MessModel.create({
      source_id: result._id,
      type: 1,
      user_id: body.target_user
    })
    res.send(result)
    if(type == 'source') {
      await UsersModel.findByIdAndUpdate(target_user, {
        $inc: { jue_power: 1 }
      })
    }
  }catch(err){
    next(err)
  }
})
// 获取文章评论列表
router.get('/list/:source_id' , async (req, res, next) => {
  let { source_id } = req.params
  try{
    let lists = await CommsModel.aggregate([
      { $match: { source_id: ObjectId(source_id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'created_by',
          foreignField: '_id',
          as: 'created_by'
        }
      }
    ])
    let handle = item => {
      let created_by = 
        item.created_by.length > 0 ? 
        filterJson(item.created_by[0], ['_id', 'username', 'position', 'avatar']) :
        null
      return {
        id: item._id,
        content: item.content,
        created_by,
        created_at: item.created_at
      }
    }
    let result = lists
      .filter(list => list.type == 'source')
      .map(row => {
        return {
          ...handle(row),
          replies: lists
            .filter(list => list.parent_id == row._id.toString())
            .map(row => {
              return {
                ...handle(row),
                reply_id: row.reply_id
              }
            })
        }
      })
    res.send(result)
  }catch(err){
    next(err)
  }
})
module.exports = router