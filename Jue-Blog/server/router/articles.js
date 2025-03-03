var express = require('express')
var router = express.Router()
var ArtsModel = require('../model/articles')

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
module.exports = router