const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logger = require('../middlewares/logger/logger')

const articleSchema = new Schema({
  title: String,//文章标题
  content: String,//文章内容
  viewCount: Number,//浏览次数
  commentCount: Number,//评论次数
  time: String,//发表时间
  coverImg: String,//封面图片
  author: String,//作者
  tags: Array,//标签
  isPublish: Boolean//是否发布
})

const articleModel = mongoose.model('article', articleSchema)

/*
 *  author: imricky
 *  time: 2019-04-30 15:57
 *  function: 文章的各种方法
*/
class articleMethods {
  constructor() {
  }

  static async insert(article) {
    return await articleModel.create(article)
  }

  static async getOneById(id) {
    return await articleModel.findOne({_id: id})
  }

  static async getOneByName(username) {
    return await articleModel.findOne({username})
  }

  static async list(params) {
    const match = {}
    const flow = articleModel.find(match)
    const users = await flow.exec()
    logger.info('list all users')
    return users
  }

}

module.exports = {
  articleMethods,
}
