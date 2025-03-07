const { expressjwt: exjwt } = require('express-jwt')
var jwt = require('jsonwebtoken')

// 密钥
const SECRET_KEY = 'alifn_jueblog_jwt_8756'
// 生成 JWT
function genoJwt(data){
  let token = jwt.sign(data, SECRET_KEY, { expiresIn: '7d' })
  return token
}
// 验证 JWT
function verifyJwt() {
  return exjwt({
    secret: SECRET_KEY,
    algorithms: ['HS256'],
    requestProperty: 'auth'
  })
}

module.exports = { genoJwt, verifyJwt }