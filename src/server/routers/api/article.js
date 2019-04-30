const express = require('express')
const router = express.Router()
const {ArticleService} = require('../../services/article_service')
const logger = require('../../middlewares/logger/logger')
/*
 *  author: imricky
 *  time: 2019-04-11 15:59
 *  function: 获取用户列表
*/
router.get('/listAll', (req, res, next) => {
  ArticleService.getAllUsers()
      .then((data) => {
        res.json({
          data
        })
      })
      .catch(e=>{
        logger.error(e)
        next(e)
      })
})


router.post('/find', (req, res, next) => {
  const username = req.body.username
  ArticleService.getOneByName(username)
      .then((re) => {
        res.json({
          message: '1',
          data: re
        })
      })
})

module.exports = router
