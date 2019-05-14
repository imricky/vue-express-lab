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
  router,
  methods:{
    // checkLogin(){
    //   //检查是否存在session
    //   //cookie操作方法在源码里有或者参考网上的即可
    //   if(!this.getCookie('session')){
    //     //如果没有登录状态则跳转到登录页
    //     this.$router.push('/login');
    //   }else{
    //     //否则跳转到登录后的页面
    //     this.$router.push('/user_info');
    //   }
    // }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route' (to, from) {
      console.log(to)
      console.log(from)
    }
  },
}).$mount('#app')
