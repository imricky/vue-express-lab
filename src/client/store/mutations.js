export default {
  // 用户login
  set_user: (state, user) => {
    localStorage.setItem('jwt_token', user.token)
    localStorage.setItem('username', user.username)
    localStorage.setItem('_id', user._id)
    state.user = user
  },
  unset_user: (state) => {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('username')
    localStorage.removeItem('_id')
    state.user = {}
  },

  // tags
  set_tags: (state, tags) => {
    state.tags = tags
  },

  // article
  update_post_title: (state, title) => {
    state.article.title = title
  },
  update_post_tag: (state, content) => {
    state.article.content = content
  },
  update_post_content: (state, content) => {
    state.article.content = content
  },
  set_article: (state, article) => {
    state.article = article
  },
  set_all_articles: (state, articles) => {
    state.articles = articles
  },
  add_articles: (state, articles) => {
    state.articles = state.articles.concat(articles)
  },
  // comment
  // set_comments: (state, comments) => {
  //   state.comments = comments
  // },
  // 对话框
  // set_dialog: (state, payload) => {
  //   state.dialog = payload
  //   state.dialog.resolveFn = () => {}
  //   state.dialog.rejectFn = () => {}
  // }
}
