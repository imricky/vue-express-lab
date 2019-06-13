const expressJwt = require("express-jwt")

const jwtAuth = expressJwt({
  secret: 'ashdjkaqkjwjehasd',
  credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
}).unless({
  path: [
    "/api/user/login",
    "/api/user/register",
    "/api/article/getList",
    "/api/article/getInfo",
    "/api/article/getAllTags",
    "/api/article/getListByTags",
  ]
})

module.exports = jwtAuth
