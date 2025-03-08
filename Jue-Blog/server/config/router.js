const { Types } = require('mongoose')
global.ObjectId = id => new Types.ObjectId(id)

const homeRouter = require('../router/home')
const userRouter = require('../router/users')
const artsRouter = require('../router/articles')
const praisRouter = require('../router/praises')
const commsRouter = require('../router/comments')
const stmsgsRouter = require('../router/shortmsgs')
const messRouter = require('../router/messages')
const followsRouter = require('../router/follows')

const router = (app) => {
  app.use('/', homeRouter)
  app.use('/users', userRouter)
  app.use('/arts', artsRouter)
  app.use('/praises', praisRouter)
  app.use('/comments', commsRouter)
  app.use('/stmsgs', stmsgsRouter)
  app.use('/messages', messRouter)
  app.use('/follows', followsRouter)
}

module.exports = router