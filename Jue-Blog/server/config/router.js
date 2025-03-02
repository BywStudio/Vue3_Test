// const { Types } = require('mongoose')
// global.ObjectId = id => new Types.ObjectId(id)


const userRouter = require('../router/users')

const router = app => {
  app.use('/users', userRouter)
}

module.exports = router