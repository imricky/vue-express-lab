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
                      this.show(params.index)
                    }
                  }
                }, '浏览'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
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
                      this.remove(params.index)
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
        if (!_.isEmpty(articles.data.data)) {
          this.articleData = articles.data.data
        }
        console.log(this.articleData)
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
