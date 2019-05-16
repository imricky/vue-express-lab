<template>
  <div>
    <MyHeader/>
    <div class="box">
      <div class="sider">
        <MySider/>
      </div>
      <div class="post">
        <h1 class="title">
          标题
        </h1>
        <div class="author">

        </div>
        <div class="show-content">
          <mavon-editor v-model="value"
                        v-html="value"
                        :subfield="false"
                        :toolbarsFlag="false"
                        :boxShadow="false"
                        @change="changeData"
          />
        </div>
      </div>
    </div>
    <MyFooter/>
  </div>
</template>

<script>

  //1.vue-showdown
  // // 作为 Vue 插件引入
  // import Vue from 'vue'
  // import VueShowdown from 'vue-showdown'
  //
  // // Vue.use() 的第二个参数是可选的
  // Vue.use(VueShowdown, {
  //   // 设置 showdown 默认 flavor
  //   flavor: 'github',
  //   // 设置 showdown 默认 options （会覆盖上面 flavor 的 options）
  //   options: {
  //     emoji: false,
  //   },
  // })

  // 2.mavon-editor
  // 全局注册
  // import with ES6
  import Vue from 'vue'
  import mavonEditor from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  // use
  Vue.use(mavonEditor)

  import marked from 'marked'

  import MyHeader from '../components/MyHeader'
  import MyFooter from '../components/MyFooter'
  import MySider from '../components/MySider'

  export default {
    name: "ArticleDetail",
    components: {
      MyFooter,
      MyHeader,
      MySider,
    },
    data() {
      return {
        value:''
      }
    },
    created() {
      this.getInfo()
    },
    computed:{
    },
    methods: {
      changeData(value, render) {
        console.log(render)
      },
      getInfo(aid) {
        this.$axios({
          url: '/api/article/getInfo',
          method: 'POST',
          data: {
            _id: '5cdb7d2ef71b1a6bcd777d78'
          }
        })
            .then(function (res) {
              let content = res.data.data.content
              let mdContent = marked(content)

            })
            .catch(e => {
              console.log(e)
            })
      }
    }
  }
</script>

<style scoped lang="scss">
  .box {
    position: relative;
    max-width: 1100px;
    min-width: 600px;
    padding: 0 16px;
    margin: 0 auto;
    border: 1px solid #FF9E92;
    display: flex;
    /*align-items: center;*/
  }

  .post {
    border: 1px solid slateblue;
    box-sizing: border-box;
    background: #eee;
    width: 770px;
    min-width: 470px;
    min-height: 600px;

    .title {
      height: 80px;
      border: 1px solid #239bf0;
      color: black;
      line-height: 80px;
      padding-left: 10px;
    }

    .author {
      border: 1px solid #2c3e50;
      height: 80px;
      /*width: auto;*/
    }

    .show-content {
      border: 1px solid sienna;
      height: 600px;
      margin: 10px;
    }
  }
</style>
