const mongoose = require('mongoose')
const {database} = require('../../config/dbConfig')
mongoose.connect(database.uri, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true})

const db = mongoose.connection

const logger = require('../logger/logger')

db.on('open', () => {
  logger.info(`数据库连接成功 || 成功时间: ${Date()}`)
})

db.on("error", function (error) {
  logger.error(`数据库连接失败 || 失败时间: ${Date()}`)
})

module.exports = db
