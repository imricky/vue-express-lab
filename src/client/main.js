import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router'
import './common/js/interceptor'


Vue.use(iView);
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
