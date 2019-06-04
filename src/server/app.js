const express = require('express')
const app = express()
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) //保存session到MongoDB

const { database } = require('./config/dbConfig')

const logger = require('./middlewares/logger/logger') //日志相关

const jwtAuth = require('./middlewares/auth/jwt') //jwt验证相关

require('./middlewares/db/mongodb_connection')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(session({
  //name: 'ricky', //设置 cookie 中，保存 session 的字段名称，默认为 connect.sid
  secret: database.secret,  // 用来对session id相关的cookie进行签名
  //store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  store: new MongoStore({
    url: database.uri,
    //touchAfter: 24 * 3600 // time period in seconds
    //ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    //ttl: 10  如果session cookie 有过期时间，mongoStore会使用这个，否则会自己创建一个
    //Each time an user interacts with the server, its session expiration date is refreshed.
  }),

  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 100 * 1000  // 有效期，单位是毫秒/这个比较重要
  }
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())
app.use(passport.session())


//allow custom header and CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');     // 跨域请求的域名端口号
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
  if (req.method === 'OPTIONS') {
    res.send(200);
    // /让options请求快速返回/
  }
  else {
    next();
  }
})

//app.use(jwtAuth)


const testRouter = require('./routers/test/test1') //测试页面各种测试
const userRouter = require('./routers/api/user') //登录&注册
const articleRouter = require('./routers/api/article') //文章方法

app.use('/test', jwtAuth,testRouter)
app.use('/api/user',jwtAuth,userRouter)
app.use('/api/article', jwtAuth,articleRouter)



app.use((err, req, res, next) => {
  // set locals, only providing error in development
  if (err.name === 'UnauthorizedError') {
    logger.error(err.message)
    res.status(401).json({
      success:false,
      data:{
        errMessage:'无效的Token!请登陆后重试!',
        removeToken:true
      },
    });
  }
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  logger.error(err.stack)
  res.status(err.status || 500)
  res.render('error')
})

process.on('uncaughtException', (err) => {

  logger.error('uncaught exception', {err})
})

process.on('unhandledReject', (reason, p) => {
  logger.error('unhandledRejection', {reason, p})
})

module.exports = app
