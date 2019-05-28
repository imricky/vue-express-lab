const Article = require('../model/articleModel')
const marked = require('marked')


class ArticleService {
  constructor() {

  }

  static async getList() {
    const article = await Article.ArticleMethods.getList()
    for (let i = 0; i < article.length; i++) {
      if(article[i].content.indexOf('<!--以上是摘要-->') !== -1){
        article[i].content = article[i].content.substring(0, article[i].content.indexOf('<!--以上是摘要-->')) + '...'
      }else {
        article[i].content = article[i].content.substring(0, 100)
      }
      // article[i].content =marked(article[i].content)
    }
    return article
  }

  static async getListByAuthor(authorAid) {
    const article = await Article.ArticleMethods.getListByAuthor(authorAid)
    return article
  }

  static async save(article) {
    const res = await Article.ArticleMethods.save(article)
    return res
  }

  static async update(aid, article) {
    const res = await Article.ArticleMethods.update(aid, article)
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
