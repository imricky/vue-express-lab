const mongoose = require('mongoose')
const {database} = require('../../config/dbConfig')
const uri = database.uri

const logger = require('../logger/logger')

mongoose.connect(uri)

const db = mongoose.connection

db.on('open', () => {
  logger.info(`数据库连接成功 || open time: ${Date()}`)
})

db.on("error", (error) => {
  logger.error(`数据库连接失败 || 失败时间: ${Date()} || 失败原因: ${error}`)
})

module.exports = db
