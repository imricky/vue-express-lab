import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import SignIn from '../pages/login/signin'
import SignUp from '../pages/login/signup'
import Main from '../pages/Main'
import NotFound from '../pages/404/404'
import ArticleDetail from '../pages/ArticleDetail'
import Member from '../pages/admin/member'
import BasicSetting from '../pages/admin/BasicSetting'
import ArticleManage from '../pages/admin/ArticleManage'

import Editor from '../pages/admin/editor'
import MyHeader from '../components/MyHeader'
import MyFooter from '../components/MyFooter'
import MySider from '../components/MySider'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  //{path: '/', component: Editor},
  //{path: '/', component: MyHeader},
  // {path: '/', component: MyFooter},
  // {path: '/', component: MySider},
  // {path: '/', component: ArticleDetail},
  {
    path: '/signin',
    name: 'signIn',
    component: SignIn
  },
  {
    path: '/signUp',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/article/:aid',
    name: 'articleDetail',
    component: ArticleDetail
  },
  {
    path: '/member/:_id',
    component: Member,
    name: 'member',
    redirect: '/member/:_id/setting',
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'setting',
        name: 'setting',
        component: BasicSetting,
        meta:{
          requireAuth: true,
        }
      },
      {
        path: 'articleManage',
        name: 'ArticleManage',
        component: ArticleManage,
        meta:{
          requireAuth: true,
        }
      },
      {
        path: 'editor',
        name: 'editor',
        component: Editor,
        meta:{
          requireAuth: true,
        }
      }
    ]
  },
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
  routes, // (缩写) 相当于 routes: routes
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {x: 0, y: 0}
  }
})

function getToken() {
  let token = window.localStorage.getItem('jwt_token')
  return !!token
}

//白名单
// const whiteList =

router.beforeEach((to, from, next) => {
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
  if(getToken() && to.path === '/signin'){
    next('/')
  }else if(!getToken() && to.meta.requireAuth){
    next('/signin')
  }else {
    next()
  }

})

// 跳转后返回顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

export default router
