const User = require('../model/userModel')

class UserService {
  constructor(){

  }
  static async getAllUsers() {
    const user = await User.UserMethods.list()
    return user
  }

  static async save(user) {
    const created = await User.UserMethods.save(user)
    return created
  }

  static async getOneById(userId) {
    const user = await User.UserMethods.getOneById(userId)
    return user
  }

  static async getOneByName(username) {
    const user = await User.UserMethods.getOneByName(username)
    return user
  }
}

module.exports = {
  UserService
}
