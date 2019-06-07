import axios from 'axios'

async function getUserInfo(_id) {
  try {
    let token = window.localStorage.getItem('jwt_token')
    if (token){

    }
    let res = await axios({
      url: '/api/user/getInfo',
      method: 'POST',
      data: {
        _id
      }
    })
    return {
      success: true,
      data: res
    }
  } catch (e) {
    return {
      success: true,
      data: res
    }
  } finally {

  }
}

export default {
  getUserInfo
}
