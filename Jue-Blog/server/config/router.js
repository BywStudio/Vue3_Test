const userRouter = require('../router/users')

const router = app => {
  app.use('/users', userRouter)
}

module.exports = router