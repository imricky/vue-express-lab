const express = require('express')
const router = express.Router()
const {UserService} = require('../../services/user_service')
const logger = require('../../middlewares/logger/logger')
const pbkdf2Sync = require('crypto').pbkdf2Sync
const jwt = require('jsonwebtoken')
const _ = require('lodash')
// const bluebird = require('bluebird')
// const pbkdf2Async = bluebird.promisify(crypto.pbkdf2);
/*
 *  author: imricky
 *  time: 2019-04-03 16:21
 *  function: 用户注册
*/
router.post('/register', (req, res, next) => {
  const cipher = pbkdf2Sync(req.body.password, 'ashdjkaqkjwjehasd', 10000, 512, 'sha256')
  let user = {
    username:req.body.username,
    password:cipher.toString('hex'),
    phone:req.body.phone,
    email:req.body.email,
    remark:req.body.remark,
  }
  UserService.save(user)
      .then((data)=>{
        res.json({
          success: true,
          data
        })
      })
      .catch(e=>{
        logger.error(e)
        res.json({
          success: false,
          errorMessage: e.message
        })
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
  if(_.isEmpty(username) || _.isEmpty(password)){
    res.json({
      success: false,
      errMessage: `用户名或密码为空`
    })
    return
  }
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
          return
        }
        const cipher = pbkdf2Sync(password, 'ashdjkaqkjwjehasd', 10000, 512, 'sha256')
        if (username !== user.username || cipher.toString('hex') !== user.password) {
          logger.error('密码错误')
          res.json({
            success: false,
            errMessage: `密码错误`
          })
          return
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
          username,
          token: token
        })
      }, (err) => {
        res.json({success: false, errMessage: `数据库操作失败${err}`})
      })
      .catch(e=>{
        logger.error(`catch到了${e}`)
        res.json({success: false, errMessage: `数据库操作失败${e}`})
      })
})


/*
 *  author: imricky
 *  time: 2019-04-11 15:59
 *  function: 获取用户列表
*/
router.get('/listAll', (req, res, next) => {
  UserService.getAllUsers()
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
  UserService.getOneByName(username)
      .then((re) => {
        res.json({
          message: '1',
          data: re
        })
      })
})

module.exports = router
