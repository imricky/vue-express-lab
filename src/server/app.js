const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) //保存session到MongoDB

const logger = require('./middlewares/logger/logger') //日志相关

require('./middlewares/db/mongodb_connection')

//allow custom header and CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');     // 跨域请求的域名端口号
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(200);
    // /让options请求快速返回/
  }
  else {
    next();
  }
})

app.use((err, req, res, next) => {
  // set locals, only providing error in development
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
