import axios from 'axios'
import qs from 'querystring'

axios.defaults.baseURL = "http://localhost:3000"  //设置 ajax 请求中的基础 URL


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = window.localStorage.getItem('jwt_token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log("data===>", response.data.data)
  if(response.data.token){
    window.localStorage.setItem('jwt_token', response.data.token);
  }
  // Do something with response data
  return response
}, function (error) {
  console.log('被拒绝了')
  console.log(`${error.response}`)
  // Do something with response error
  return Promise.reject(error)
})

export default axios


