import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(iView);
Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:3000"  //设置 ajax 请求中的基础 URL
Vue.prototype.$axios = axios


// axios.get("/api/user/listAll", {  // 这里的 this 指向 Vue
// })
//     .then(function(response) {
//       console.log(response)
//     })
//     .catch(function(error) {
//       console.log(error)
//     })

// 1. Define route components.
// These can be imported from other files
import SignIn from './pages/login/signin'
import HelloWord from './components/HelloWorld'
const Foo = SignIn
const Bar = HelloWord

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes
})

new Vue({

  render: h => h(App),
  router

}).$mount('#app')
