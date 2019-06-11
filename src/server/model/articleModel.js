const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logger = require('../middlewares/logger/logger')
const Sequence = require('../middlewares/db/sequence')

const articleSchema = new Schema({
  aid: {type: Number, index: {unique: true}}, //文章唯一id,用作主键
  title: {type: String, required: true, unique: true},//文章标题
  content: String,//文章内容
  viewCount: Number,//浏览次数
  commentCount: Number,//评论次数
  coverImg: String,//封面图片
  author: String,//作者
  authorAid: String,//作者表的id
  tags: [String],//标签
  isPublish: Boolean,//是否发布
  updated: {type: Date, default: Date.now},
  created: {type: Date, default: Date.now}
})

//在创建文档时，获取自增ID值
articleSchema.pre('save', function (next) {
  var self = this
  if (self.isNew) {
    Sequence.increment('articleModel', function (err, result) {
      if (err)
        throw err
      self.aid = result.value.next
      next()
    })
  } else {
    next()
  }
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

  //获取所有文章,添加分页
  static async getList(currentPage) {
    let countQuery = await articleModel.count()
    let findQuery =  await articleModel.find({}).sort({updated: -1}).skip(10*(currentPage-1)).limit(10)
    return {
      records: findQuery,
      totalCount: countQuery
    }
  }

  //获取当前作者的所有文章
  static async getListByAuthor(authorAid) {
    return await articleModel.find({authorAid}, {content: 0}).sort({updated: -1})
  }

  //添加文章
  static async save(article) {
    try {
      //标题必须是唯一的
      let res = await new articleModel(article).save()
      logger.info(res)
      return res
    } catch (e) {
      console.log(e)
      logger.error(`错误${e}`)
      throw new Error(e.message)
    }

  }

  static async update(aid, article) {
    try {
      //标题必须是唯一的
      let res = await articleModel.update({aid: aid}, article)
      logger.info(res)
      return res
    } catch (e) {
      console.log(e)
      logger.error(`错误${e}`)
      throw new Error(e.message)
    }
  }

  //获取单条文章信息
  static async getInfo(aid) {
    let current = await articleModel.findOne({aid: aid})

    let pre =  await articleModel.find({'aid':{'$lt':aid}})
        .sort({aid:-1})
        .limit(1)
        .select({ "aid": 1, "title": 1});
    let next = await articleModel.find({'aid':{'$gt':aid}})
        .sort({aid:1})
        .limit(1)
        .select({ "aid": 1, "title": 1});
    return {
      current,
      pre,
      next
    }

  }

  //删除文章
  static async delete(aid) {
    let res = await articleModel.remove({aid: aid})
    return res
  }

}

module.exports = {
  ArticleMethods,
}
