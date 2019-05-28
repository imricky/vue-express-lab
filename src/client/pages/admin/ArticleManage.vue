<template>
  <div>
    <Table stripe :columns="articleColumns" :data="articleData"></Table>
  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'

  export default {
    name: "ArticleManage",
    data() {
      return {
        articleColumns: [
          {
            title: '标题',
            key: 'title',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.title)
              ])
            }
          },
          {
            title: '作者',
            key: 'author'
          },
          {
            title: '创建时间',
            key: 'created'
          },
          {
            title: '更新时间',
            key: 'updated'
          },
          {
            title: '操作',
            key: 'action',
            width: 250,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let aid = params.row.aid
                      this.$router.push({path: `/article/${aid}`})
                    }
                  }
                }, '浏览'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let aid = params.row.aid
                      this.updateArticle(aid)
                    }
                  }
                }, '更新'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      let aid = params.row.aid
                      let title = params.row.title
                      let index = params.index
                      this.deleteArticle(title, aid, index)
                    }
                  }
                }, '删除'),
              ])
            }
          }
        ],
        articleData: []
      }
    },
    computed: {},
    methods: {
      async getArticle() {
        let token = window.localStorage.getItem('jwt_token')
        let userInfo
        if (token) {
          userInfo = jwt.decode(token)
        }

        let articles = await this.$axios({
          url: '/api/article/getListByAuthor',
          method: 'POST',
          data: {
            authorAid: userInfo._id
          }
        })
        if (!_.isUndefined(articles.data.data)) {
          this.articleData = articles.data.data
        }
      },
      async delete(aid) {
        let res = await this.$axios({
          url: '/api/article/delete',
          method: 'POST',
          data: {
            aid: aid
          }
        })
        return res
      },
      deleteArticle(title, aid, index) {
        this.$Modal.confirm({
          title: '提示',
          content: `<p>确定要删除【${title}】吗？</p>`,
          onOk: async () => {
            let res = await this.delete(aid)
            if (res.data.success === true) {
              this.articleData.splice(index, 1)
              this.$Message.success('删除成功')
            }
          },
          onCancel: () => {
            this.$Message.info('取消操作')
          }
        })
      },
      async updateArticle(aid) {
        let token = window.localStorage.getItem('jwt_token')
        let userInfo
        let username
        if (token) {
          userInfo = jwt.decode(token)
          let res = await this.$axios({
            url: '/api/user/getInfo',
            method: 'POST',
            data: {
              _id: userInfo._id
            }
          })
          username = res.data.data.username
          // this.$router.push({path:`/member/${username}/editor`})
          this.$router.push({name: 'editor', params: {username: username, aid: aid}})
        }

      }
    },
    created() {
      this.getArticle()
    },
    mounted() {

    },
  }
</script>

<style scoped lang="scss">

</style>
