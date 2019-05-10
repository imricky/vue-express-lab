import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import SignIn from '../pages/login/signin'
import SignUp from '../pages/login/signup'
import Main from '../pages/Main'

const routes = [
  {path: '/', component: Main},
  {path: '/signin', component: SignIn},
  {path: '/signup', component: SignUp},

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  // mode:'history', //去掉url中的#
  routes // (缩写) 相当于 routes: routes
})

export default router
