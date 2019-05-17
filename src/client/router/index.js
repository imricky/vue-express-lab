import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import SignIn from '../pages/login/signin'
import SignUp from '../pages/login/signup'
import Main from '../pages/Main'
import NotFound from '../pages/404/404'
import ArticleDetail from '../pages/ArticleDetail'
import Editor from '../pages/admin/editor'
import MyHeader from '../components/MyHeader'
import MyFooter from '../components/MyFooter'
import MySider from '../components/MySider'

const routes = [
  //{path: '/', component: Main},
  //{path: '/', component: Editor},
  //{path: '/', component: MyHeader},
  // {path: '/', component: MyFooter},
  // {path: '/', component: MySider},
  {path: '/', component: ArticleDetail},
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

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  next()
  // if(getToken()){
  //   //登录后将导向/login路由重定向到主页面
  //   if (to.path === '/login') {
  //     next({path: '/'})
  //     //检测vuex储存的用户信息是否还存在,不存在重新获取一次
  //   } else if (!store.getters.role) {
  //     store.dispatch('GetInfo').then(() => {
  //       next({...to})
  //     })
  //   } else {//next()终止跳出循环
  //     next()
  //   }
  // }else if (whiteList.indexOf(to.path) !== -1) {
  //   //如果前往的路径是白名单内的,就可以直接前往
  //   next()
  // }else {
  //   next('/login');
  // }
})

export default router
