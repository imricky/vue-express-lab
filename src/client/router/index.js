import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import SignIn from '../pages/login/signin'
import SignUp from '../pages/login/signup'
import Main from '../pages/Main'
import NotFound from '../pages/404/404'

const routes = [
  {path: '/', component: Main},
  {path: '/signin', component: SignIn},
  {path: '/signup', component: SignUp},
  {
    name: '404',
    path: '/404',
    component: NotFound,
  },
  {
    path: '*',    // 此处需特别注意至于最底部
    redirect: '/404'
  }

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  // mode:'history', //去掉url中的#
  routes // (缩写) 相当于 routes: routes
})

export default router
