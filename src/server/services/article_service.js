const Article = require('../model/articleModel')

class ArticleService {
  constructor(){

  }
  static async getList() {
    const article = await Article.ArticleMethods.getList()
    return article
  }

  static async save(article) {
    const res = await Article.ArticleMethods.save(article)
    return res
  }

  static async getInfo(aid) {
    const article = await Article.ArticleMethods.getInfo(aid)
    return article
  }

  static async delete(aid) {
    const deleteCount = await Article.ArticleMethods.delete(aid)
    return deleteCount
  }
}

module.exports = {
  ArticleService
}
