const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logger = require('../middlewares/logger/logger')

const articleSchema = new Schema({
  aid: {type: Number, index: {unique: true}}, //文章唯一id,用作主键
  title: {type: String, required: true, unique: true},//文章标题
  content: String,//文章内容
  viewCount: Number,//浏览次数
  commentCount: Number,//评论次数
  time: String,//发表时间
  coverImg: String,//封面图片
  author: String,//作者
  tags: String,//标签
  isPublish: Boolean//是否发布
})

const articleModel = mongoose.model('article', articleSchema)

/*
 *  author: imricky
 *  time: 2019-04-30 15:57
 *  function: 文章的各种方法
*/
class ArticleMethods {
  constructor() {
  }

  //获取所有文章
  static async getList() {
    return await articleModel.find({})
  }

  //添加and修改文章
  static async save(article) {
    try {
      //标题必须是唯一的
      let title = article.title
      let res = await new articleModel(article).save()
      logger.info(res)
      return res
    } catch (e) {
      console.log(e)
      logger.error(`错误${e}`)
      throw new Error(e.message)
    }

  }

  //获取单条文章信息
  static async getInfo(id) {
    return await articleModel.findById({_id: id})
  }

  //删除文章
  static async delete(id) {
    let res = await articleModel.findByIdAndDelete({_id: id})
    return res
  }

}

module.exports = {
  ArticleMethods,
}
