<template>
  <div class="box">
    <div id="title">
      <Divider orientation="left" class="divider">标题</Divider>
      <Input v-model="title" class="info-input" placeholder="Enter something..."/>
    </div>
    <div id="tags">
      <Divider orientation="left" class="divider">标签</Divider>
      <Input v-model="tags" class="info-input" placeholder="大数据#生活#JS,以#分割"/>
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
      checkData(){
        if(_.isEmpty(this.title)){
          this.$Message.error('标题不能为空')
          return false
        }
        if(_.isEmpty(this.tags)){
          this.$Message.error('标签不能为空')
          return false
        }
        if(_.isEmpty(this.content)){
          this.$Message.error('内容不能为空')
          return false
        }
      },
      async publish() {
        if(this.checkData() === false){
          return false
        }
        let token = window.localStorage.getItem('jwt_token')
        let jwtUser
        if (token) {
          jwtUser = jwt.decode(token)
        }else {
          this.$Message.error({
            content: '您还没有登录，请登录后重试！',
            // onClose: () => {
            //   this.$router.push('/')
            // }
          })
          return false
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
        let currentArticle = res.data.data.current
        this.title = currentArticle.title
        this.tags = currentArticle.tags.join('#')
        this.content = currentArticle.content
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
