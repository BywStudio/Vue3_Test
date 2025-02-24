var express = require('express')
var router = express.Router()
var UsersModel = require('../model/users')

// 加密
const encrypt = require('../utils/crypto')

router.all('/', (req, res) => {
  res.send('用户管理 API')
})

// 用户注册
router.post('/create', async (req, res) => {
  let body = req.body
  try {
    if(!body.password || body.password.length < 6) {
      return res.status(400).send({ message: '密码必填，长度不能小于 6 位'})
    }
    body.password = encrypt(body.password)
    let result = await UsersModel.create(body)
    res.send(result)
  }catch (err) {
    next(err)
  }
})

module.exports = router