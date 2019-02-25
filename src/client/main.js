import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:3000"  //设置 ajax 请求中的基础 URL
Vue.prototype.$axios = axios

axios.get("/userInfo", {  // 这里的 this 指向 Vue
  params: {
    ID: 12345
  }
})
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })

new Vue({
  render: h => h(App),
}).$mount('#app')
