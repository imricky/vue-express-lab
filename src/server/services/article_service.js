const Article = require('../model/articleModel')

class ArticleService {
  constructor(){

  }
  static async getAllUsers() {
    const article = await Article.articleMethods.list()
    return article
  }

  static async insertUser(user) {
    const created = await Article.articleMethods.insert(user)
    return created
  }

  static async getOneById(userId) {
    const article = await Article.articleMethods.getOneById(userId)
    return article
  }

  static async getOneByName(username) {
    const article = await Article.articleMethods.getOneByName(username)
    return article
  }
}

module.exports = {
  ArticleService
}
