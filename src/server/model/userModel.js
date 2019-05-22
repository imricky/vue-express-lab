const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logger = require('../middlewares/logger/logger')

const userSchema = new Schema({
  // id: {type: Schema.Types.ObjectId, required: true, index: true},
  username: {type: String, required: true, unique: true},
  password: String,
  email: String,
  phone: String,
  updated: {type: Date, default: Date.now},
  created: {type: Date, default: Date.now},
  remark: String,
  status: {type: Number, default: 1}, //用户状态，1代表在线，2代表删除
  // comments: [{ body: String, date: Date }],
  // date: { type: Date, default: Date.now },
  // hidden: Boolean,
  // meta: {
  //   votes: Number,
  //   favs:  Number
  // }
})

const UserModel = mongoose.model('user', userSchema)

class UserMethods {
  constructor() {
  }


  static async save(user) {
    let usernameDup = await UserModel.find({
      username: user.username
    })
    console.log(usernameDup)
    if (usernameDup.length !== 0) {
      throw new Error(`${user.username}已经被占用了，请再找一个吧~`)
    }
    try {
      let res = await new UserModel(user).save()
      logger.info(res)
      return res
    } catch (e) {
      console.log(e)
      logger.error(`错误${e}`)
      throw new Error(e.message)
    }
  }

  static async update(id, user) {
    try {
      //标题必须是唯一的
      let res = await UserModel.update({id: id}, user)
      logger.info(res)
      return res
    } catch (e) {
      console.log(e)
      logger.error(`错误${e}`)
      throw new Error(e.message)
    }
  }

  static async getOneById(id) {
    return await UserModel.findOne({_id: id})
  }

  static async getOneByName(username) {
    return await UserModel.findOne({username})
  }

  static async list(params) {
    const match = {}
    const flow = UserModel.find(match)
    const users = await flow.exec()
    logger.info('list all users')
    return users
  }

}

module.exports = {
  UserMethods,
  // UserModel
}
