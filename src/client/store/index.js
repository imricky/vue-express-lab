import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

/*
 *  author: imricky
 *  time: 2019-06-25 20:41
 *  function:
 *  状态：
 * user:{} //用户信息
 * isLogin 是否登录
 * curArticle:{} 当前文章(一个大对象)
 * articleList:[] 文章列表
 * isLoading 全局正在加载中
 * tags 左侧文章标签
 *
 *
 *
*/
const store = new Vuex.Store({
  state: {
    user: {},
    isLogin: false,
    isLoading: false,
    tags: [],
    curArticle: {},
    articleList: [],
    comments: [],
    dialog: {
      show: false,
      hasTwoBtn: false,
      info: 'hey',
      resolveFn: () => {},
      rejectFn: () => {}
    },
  },
  actions,
  mutations
})
export default store
