<template>
  <div class="box">
    <div id="title">
      <Divider orientation="left" class="divider">标题</Divider>
      <Input v-model="title" class="info-input" placeholder="Enter something..."/>
    </div>
    <div id="tags">
      <Divider orientation="left" class="divider">标签</Divider>
      <Input v-model="tags" class="info-input" placeholder="Enter something..."/>
    </div>
    <div id="content">
      <Divider orientation="left" class="divider">文章内容</Divider>
      <mavon-editor v-model="content"/>
    </div>
    <div id="publish">
      <Button icon="ios-cloud-upload-outline" @click="publish">发布</Button>
      <Button icon="ios-search" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </div>

  </div>
</template>
<script>
  import marked from 'marked'
  import hljs from 'highlight.js'
  import javascript from 'highlight.js/lib/languages/javascript'
  import 'highlight.js/styles/monokai-sublime.css'
  import jwt from 'jsonwebtoken'
  import _ from 'lodash'

  export default {
    name: 'Editor',
    data() {
      return {
        title: '',
        tags: '',
        content: '',
        aid: this.$route.params.aid
      }
    },
    methods: {

      async publish() {
        let token = window.localStorage.getItem('jwt_token')
        let jwtUser
        if (token) {
          jwtUser = jwt.decode(token)
        }
        let content = this.content
        let title = this.title
        let tags = this.tags
        let res
        if (_.isUndefined(this.aid)) {
          res = await this.$axios({
            url: '/api/article/save',
            method: 'POST',
            data: {
              title: this.title,
              content: this.content,
              tags: this.tags,
              author: jwtUser.username,
              authorAid: jwtUser._id
            },
          })
        } else {
          res = await this.$axios({
            url: '/api/article/' + this.aid,
            method: 'PATCH',
            data: {
              title: this.title,
              content: this.content,
              tags: this.tags
            }
          })
        }
        if (res.data.success === true) {
          this.$Message.success({
            content: '保存成功',
            onClose: () => {
              this.$router.push('/')
            }
          })
        } else {
          this.$Message.error(`保存失败${res.data.errorMessage}`)
        }

      },
      async getArticleInfo(aid) {
        let res = await this.$axios({
          url: '/api/article/getInfo',
          method: 'POST',
          data: {
            aid: this.aid
          },
        })
        this.title = res.data.data.title
        this.tags = res.data.data.tags.toString() //TODO:这个地方数组需要处理一下,有坑
        this.content = res.data.data.content
      }

    },
    computed: {},
    created() {
      if (!_.isUndefined(this.aid)) {
        this.getArticleInfo(this.aid)
      }
    }
  }
</script>

<style scoped lang="scss">
  .box {
    border: 1px solid forestgreen;
    width: 100%;
    min-height: 560px;

    .divider {
      margin: 5px 0;
    }
  }

  #content {
    width: auto;
  }

  .info-input {
    width: 800px;
    margin-left: 40px;
  }

  #publish {
    margin: 25px 0 10px 10px;

  }

  /*#title{*/
  /*  border: 1px solid forestgreen;*/
  /*  width: 600px;*/
  /*}*/
</style>
