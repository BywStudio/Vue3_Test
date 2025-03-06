const express = require('express')
const router = express.Router()

const MessModel = require('../model/messages')

router.all('/', (req, res) => {
  res.send('消息管理 API')
})
// 未读消息接口
router.get('/info', async (req, res, next) => {
  let { user_id } = req.query
  try{
    let result = await MessModel.aggregate([
      { $match: { user_id: ObjectId(user_id), status: 0} },
      { $group: {
        _id: '$type',
        count: { $sum: 1 }
      }}
    ])
    let rsinfo = Object.fromEntries(
      result.map(json => ['type' + json._id, json.count])
    )
    let resjson = {
      comment: rsinfo['type1'] || 0,
      praise: rsinfo['type2'] || 0,
      follow: rsinfo['type3'] || 0,
      total: result.reduce((a, b) => a + b.count, 2)
    }
    res.send(resjson)
  }catch(err){
    next(err)
  }
})

module.exports = router