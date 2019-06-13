const Article = require('../model/articleModel')
const marked = require('marked')
const _ = require('lodash')


class ArticleService {
  constructor() {

  }

  static async getList(currentPage) {
    let res = await Article.ArticleMethods.getList(currentPage)
    const article = res.records
    const totalCount = res.totalCount
    for (let i = 0; i < article.length; i++) {
      if (article[i].content.indexOf('<!--以上是摘要-->') !== -1) {
        article[i].content = article[i].content.substring(0, article[i].content.indexOf('<!--以上是摘要-->')) + '...'
      } else {
        article[i].content = article[i].content.substring(0, 100)
      }
      // article[i].content =marked(article[i].content)
    }
    return {
      article,
      totalCount
    }
  }

  static async getListByAuthor(authorAid) {
    const article = await Article.ArticleMethods.getListByAuthor(authorAid)
    return article
  }

  static async save(article) {
    if (article.tags.indexOf('#')) {
      article.tags = article.tags.split("#")
    }
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

  static async getAllTags() {
    let allTags = await Article.ArticleMethods.getAllTags()
    /*
 *  author: imricky
 *  time: 2019-06-12 21:17
 *  function:
 *  return: 返回数据类型：[["python":1],["JS":3]]
*/
    let arr = []
    allTags.map((i) => {
      arr.push(i.tags)
    })
    arr = _.flatten(arr)

    let finalObj = arr.reduce(function (prev, next) {
      prev[next] = (prev[next] + 1) || 1
      return prev
    }, {})

    let final = []
    for (let i in finalObj) {
      let temp = []
      temp.push(i)
      temp.push(finalObj[i])
      final.push(temp)
    }
    return final
  }

  static async getListByTags(tagName) {
    let article = await Article.ArticleMethods.getListByTags(tagName)

    for (let i = 0; i < article.length; i++) {
      if (article[i].content.indexOf('<!--以上是摘要-->') !== -1) {
        article[i].content = article[i].content.substring(0, article[i].content.indexOf('<!--以上是摘要-->')) + '...'
      } else {
        article[i].content = article[i].content.substring(0, 100)
      }
      // article[i].content =marked(article[i].content)
    }

    return article
  }
}

module.exports = {
  ArticleService
}
