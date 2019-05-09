import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router'


Vue.use(iView);
Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:3000"  //设置 ajax 请求中的基础 URL
Vue.prototype.$axios = axios

new Vue({

  render: h => h(App),
  router

}).$mount('#app')
