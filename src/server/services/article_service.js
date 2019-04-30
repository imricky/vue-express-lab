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

  static async getInfo(id) {
    const article = await Article.ArticleMethods.getInfo(id)
    return article
  }

  static async delete(id) {
    const deleteCount = await Article.ArticleMethods.delete(id)
    return deleteCount
  }
}

module.exports = {
  ArticleService
}
