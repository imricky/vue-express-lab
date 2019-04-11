const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logger = require('../middlewares/logger/logger')

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  reg_date: {type: Date, default: Date.now},
  remarks: String
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


  static async insert(user) {
    return await UserModel.create(user)
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
