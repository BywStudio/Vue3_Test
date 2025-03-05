const { Types } = require('mongoose')
global.ObjectId = id => new Types.ObjectId(id)


const userRouter = require('../router/users')
const artsRouter = require('../router/articles')
const praisRouter = require('../router/praises')
const commsRouter = require('../router/comments')


const router = (app) => {
  app.use('/users', userRouter)
  app.use('/arts', artsRouter)
  app.use('/praises', praisRouter)
  app.use('/comments', commsRouter)
}

module.exports = router