import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:3000"  //设置 ajax 请求中的基础 URL
Vue.prototype.$axios = axios


axios.get("/api/user/listAll", {  // 这里的 this 指向 Vue
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
