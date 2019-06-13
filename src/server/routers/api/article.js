const express = require('express')
const router = express.Router()
const {ArticleService} = require('../../services/article_service')
const logger = require('../../middlewares/logger/logger')


router.post('/getList', (req, res, next) => {
  let currentPage = req.body.currentPage
  ArticleService.getList(currentPage)
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

router.post('/getListByAuthor', (req, res, next) => {
  let authorAid = req.body.authorAid
  ArticleService.getListByAuthor(authorAid)
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
    author: req.body.author,//作者
    tags: req.body.tags,//标签
    isPublish: req.body.isPublish,//是否发布
    authorAid: req.body.authorAid //作者的aid
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


router.patch('/:aid', (req, res, next) => {
  const aid = req.params.aid
  let article = {
    title: req.body.title,
    content: req.body.content,
    updated: Date.now(),
    tags: req.body.tags,//标签
    isPublish: true//是否发布

  }
  ArticleService.update(aid, article)
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
  let aid = req.body.aid
  ArticleService.getInfo(aid)
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
  let aid = req.body.aid
  ArticleService.delete(aid)
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

//获取所有标签云
router.get('/getAllTags', (req, res, next) => {
  ArticleService.getAllTags()
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
//获取标签云对应的文章列表
router.post('/getListByTags', (req, res, next) => {
  let tagName = req.body.tagName
  ArticleService.getListByTags(tagName)
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

module.exports = router
