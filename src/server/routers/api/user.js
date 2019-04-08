const express = require('express')
const router = express.Router()
const {UserService} = require('../../services/user_service')
const logger = require('../../middlewares/logger/logger')
// const { MD5_SUFFIX, md5, secretKey } = require('../../config/md5_salt');
const pbkdf2Sync = require('crypto').pbkdf2Sync
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
        const cipher = pbkdf2Sync(req.body.password,'ashdjkaqkjwjehasd',10000,512,'sha256');
        if(user === null){
          const insertInfo = {
            username:req.body.username,
            password: cipher.toString('hex'),
            //password: req.body.password,
            email: req.body.email,
            remarks: req.body.remarks
          }
          UserService.insertUser(insertInfo).then((doc)=>{
            logger.info(`用户注册成功：${doc} `)
            res.json({ success: true, data: doc });
          },(err)=>{
            logger.error(err)
            res.json({ success: false, errMessage:err });
          })
        }else {
          logger.info(`该用户名已存在:${username}`)
          res.json({ success: false, errMessage:`该用户名已存在` });
        }

      }, () => {
        res.json({ success: false, errMessage:`数据库操作失败` });
      })

})


router.post('/find', (req, res, next) => {
  const username = req.body.username;
  UserService.getOneByName(username)
      .then((re)=>{
        res.json({
          message:'1',
          data:re
        })
      })
})

module.exports = router
