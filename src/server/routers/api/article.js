const express = require('express')
const router = express.Router()
const {ArticleService} = require('../../services/article_service')
const logger = require('../../middlewares/logger/logger')


router.get('/getList', (req, res, next) => {
  ArticleService.getList()
      .then((data) => {
        res.json({
          data
        })
      })
      .catch(e => {
        logger.error(e)
        next(e)
      })
})

router.post('/save', (req, res, next) => {
  let article = {
    title: req.body.title,
    content: req.body.content,
    viewCount: req.body.viewCount,
    commentCount: req.body.commentCount,
    time: req.body.time,
    author: req.body.author,//作者
    tags: req.body.tags,//标签
    isPublish: req.body.isPublish//是否发布

  }
  ArticleService.save(article)
      .then((data) => {
        res.json({
          success: true,
          data
        })
      })
      .catch(e => {
        logger.error(e)
        res.json({
          success: false,
          errorMessage: e.message
        })
      })
})

router.post('/getInfo', (req, res, next) => {
  let id = req.body._id
  ArticleService.getInfo(id)
      .then((data) => {
        res.json({
          data
        })
      })
      .catch(e => {
        logger.error(e)
        res.json({
          success: false,
          errorMessage: e
        })
      })
})

router.post('/delete', (req, res, next) => {
  let id = req.body._id
  ArticleService.delete(id)
      .then((data) => {
        res.json({
          success: true,
          count: data
        })
      })
      .catch(e => {
        logger.error(e)
        res.json({
          success: false,
          errorMessage: e
        })
      })
})
module.exports = router
