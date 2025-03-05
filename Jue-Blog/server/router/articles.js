var express = require('express')
var router = express.Router()
var ArtsModel = require('../model/articles')
var UsersModel = require('../model/users')

router.all('/', (req, res) => {
  res.send('文章管理 API')
})
// 创建文章接口
router.post('/create', async (req, res, next) => {
  let body = req.body
  try{
    let result = await ArtsModel.create(body)
    res.send(result)
  }catch(err){
    next(err)
  }
})
// 发布文章接口
router.post('/publish/:id', async (req, res, next) => {
  let { id } = req.params
  try {
    let result = await ArtsModel.findByIdAndUpdate(id, {
       status: 1,
       created_at: new Date()
      })
    if(result) {
      res.send({ message: '发布成功'})
    }else {
      res.status(400).send({ message: '发布失败，文章 ID 错误'})
    }
  }catch(err) {
    next(err)
  }
})
// 修改文章接口
router.post('/update/:id', async (req, res, next) => {
  let body = req.body
  let { id } = req.params
  try{
    let allow_keys = ['title', 'intro', 'content', 'category', 'tags']
    Object.keys(body).forEach(key => {
      if(!allow_keys.includes(key)) {
        delete body[key]
      }
    })
    if(Object.keys(body).length == 0){
      return res.status(400).send({ message: '请传入需要修改的数据'})
    }
    body.updated_at = new Date()
    let result = await ArtsModel.findByIdAndUpdate(id, body)
    if(result){
      res.send({ message: '修改成功'})
    }else {
      res.status(400).send({ message: '修改失败，文章 ID 错误'})
    }
  }catch(err) {
    next(err)
  }
})
// 删除文章接口
router.delete('/remove/:id', async (req, res ,next) => {
  let { id } = req.params
  try{
    let result = await ArtsModel.findByIdAndDelete(id)
    if(result){
      res.send({ message: '删除成功'})
    }else {
      res.status(400).send({ message: '删除失败，文章 ID 错误'})
    }
  }catch(err){
    next(err)
  }
})
// 文章列表接口
router.get('/list', async (req, res, next) => {
  let { user_id } = req.query
  try{
    let result = await ArtsModel.aggregate([
      // 关联查询评论集合
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'source_id',
          as: 'comments'
        },
      },
      // 关联查询点赞集合
      {
        $lookup: {
          from: 'praises',
          localField: '_id',
          foreignField: 'target_id',
          as: 'praises'
        },
      },
      // 处理点赞和评论数据
      {
        $addFields: {
          praises: {
            $filter: {
              input: '$praises',
              as: 'arrs',
              cond: { $eq: ['$$arrs.type', 1]}
            }
          },
          comments: { $size: '$comments' }
        }
      },
      // 返回点赞数量和当前用户是否点赞
      {
        $addFields: {
          is_praise: {
            $in: [ObjectId(user_id), '$praises.created_by']
          },
          praises: { $size: '$praises'}
        }
      }
    ])
    res.send(result)
  }catch(err){
    next(err)
  }
})
/// 文章详情
router.get('/detail/:id', async (req, res, next) => {
  let { id } = req.params
  let user_id = req.auth ? req.auth._id : null
  try {
    let result = await ArtsModel.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'praises',
          localField: '_id',
          foreignField: 'target_id',
          as: 'praises',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'source_id',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'created_by',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $addFields: {
          praises: {
            $filter: {
              input: '$praises',
              as: 'arrs',
              cond: { $eq: ['$$arrs.type', 1] },
            },
          },
          comments: {
            $size: '$comments',
          },
          stars: {
            $filter: {
              input: '$praises',
              as: 'arrs',
              cond: { $eq: ['$$arrs.type', 2] },
            },
          },
          user: {
            $first: '$user',
          },
        },
      },
      {
        $addFields: {
          is_praise: {
            $in: [ObjectId(user_id), '$praises.created_by'],
          },
          praises: {
            $size: '$praises',
          },
          is_start: {
            $in: [ObjectId(user_id), '$stars.created_by'],
          },
          stars: {
            $size: '$stars',
          },
        },
      },
      {
        $unset: ['user.password', 'user.__v'],
      },
    ])
    if (result.length > 0) {
      await ArtsModel.findByIdAndUpdate(id, {
        $inc: { page_view: 1 },
      })
      await UsersModel.findByIdAndUpdate(result[0].created_by, {
        $inc: { read_num: 1 },
      })
      res.send(result[0])
    } else {
      res.status(400).send({ message: '文章不存在' })
    }
  } catch (err) {
    next(err)
  }
})
module.exports = router