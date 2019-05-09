import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import SignIn from '../pages/login/signin'
import HelloWord from '../components/HelloWorld'

const routes = [
  { path: '/foo', component: SignIn },
  { path: '/bar', component: HelloWord }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router
