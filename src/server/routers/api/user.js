const express = require('express')
const router = express.Router()
const {UserService} = require('../../services/user_service')
const logger = require('../../middlewares/logger/logger')
// const { MD5_SUFFIX, md5, secretKey } = require('../../config/md5_salt');
const pbkdf2Sync = require('crypto').pbkdf2Sync
const jwt = require('jsonwebtoken')
// const bluebird = require('bluebird')
// const pbkdf2Async = bluebird.promisify(crypto.pbkdf2);
/*
 *  author: imricky
 *  time: 2019-04-03 16:21
 *  function: 用户注册
*/
router.post('/register', (req, res, next) => {
  const username = req.body.username
  const tokenUser = {
    username
  }
  UserService.getOneByName(username)
      .then((user) => {
        const cipher = pbkdf2Sync(req.body.password, 'ashdjkaqkjwjehasd', 10000, 512, 'sha256')
        if (user === null) {
          const insertInfo = {
            username: req.body.username,
            password: cipher.toString('hex'),
            //password: req.body.password,
            email: req.body.email,
            remarks: req.body.remarks
          }
          UserService.insertUser(insertInfo).then((doc) => {
            logger.info(`用户注册成功：${doc} `)
            res.json({success: true, data: doc})
          }, (err) => {
            logger.error(err)
            res.json({success: false, errMessage: err})
          })
        } else {
          logger.info(`该用户名已存在:${username}`)
          res.json({success: false, errMessage: `该用户名已存在`})
        }

      }, () => {
        res.json({success: false, errMessage: `数据库操作失败`})
      })

})

/*
 *  author: imricky
 *  time: 2019-04-08 20:41
 *  function:用户登录
*/
router.post('/login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const tokenObj = {
    username: req.body.username,
  }
  UserService.getOneByName(username)
      .then((user) => {
        if (user === null) {
          logger.error(`用户名不存在，用户名为：${username}`)
          res.json({
            success: false,
            errMessage: `${username}该用户名不存在`
          })
        }
        const cipher = pbkdf2Sync(password, 'ashdjkaqkjwjehasd', 10000, 512, 'sha256')
        if (username !== user.username || cipher.toString('hex') !== user.password) {
          logger.error('用户名或密码错误')
          res.json({
            success: false,
            errMessage: `用户名或密码错误`
          })
        }
        // 用户登录成功过后生成token返给前端
        let token = jwt.sign(
            tokenObj,
            'ashdjkaqkjwjehasd',
            {
              expiresIn: 60 // 授权时效24小时
            }
        )
        logger.info(`用户${username}登录成功`)
        res.json({
          success: true,
          message: `用户${username}登录成功`,
          token: token
        })
      }, (err) => {
        res.json({success: false, errMessage: `数据库操作失败${err}`})
      })
})


router.post('/find', (req, res, next) => {
  const username = req.body.username
  UserService.getOneByName(username)
      .then((re) => {
        res.json({
          message: '1',
          data: re
        })
      })
})

module.exports = router
