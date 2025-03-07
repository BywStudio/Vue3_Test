var express = require('express')
var router = express.Router()
var UsersModel = require('../model/users')
const { genoJwt } = require('../utils/jwt')



// 加密
const encrypt = require('../utils/crypto')

router.all('/', (req, res) => {
  res.send('用户管理 API')
})

// 用户注册
router.post('/create', async (req, res, next) => {
  let body = req.body
  try {
    if (!body.password || body.password.length < 6) {
      return res.status(400).send("密码必填且不能少于6位")
    }
    body.password = encrypt(body.password)
    let result = await UsersModel.create(body)
    res.send(result)
  } catch (err) {
    next(err)
  }
})
// 用户登录
router.post('/login', async (req, res, next) => {
  let body = req.body
  try{
    if(!body.phone || !body.password){
      return res.status(400).send({ message: '请输入手机号和密码'})
    }
    let { phone, password} = body
    password = encrypt(password)
    let result = await UsersModel.findOne({ phone, password })
    if(result) {
      // 改造这里，验证 token 登录
      let { _id, username } = result
      let token = genoJwt({ _id, username })
      res.send({
        code: 200,
        data: result,
        token: token
      })
    }else {
      res.send({
        code: 20001,
        message: '用户名或密码错误'
      })
    }
  }catch(err){
    next(err)
  }
})
// 修改用户信息
router.put('/update', async (req, res ,next) => {
  let body = req.body
  let { phone } = req.params
  try{
    // 允许修改的参数
    let allow_keys = ['username', 'introduc', 'abatar', 'position', 'company']
    Object.keys(body).forEach(key => {
      if(!allow_keys.includes(key)){
        delete body[key]
      }
    })
    // 判断参数是否为空
    if(Object.keys(body).length === 0){
      return res.status(400).send({ message: '请传入要更新的数据' })
    }
    let result = await UsersModel.findOneAndUpdate(phone, body)
    if(result){
      res.send({ message: '更新成功'})
    }else {
      res.status(400).send({ message: '更新失败，用户 ID 错误'})
    }
  }catch(err) {next(err)}
})

module.exports = router
// 35a9e87b69c595fab0c58c4204ba597c