<template>
  <div>
    <MyHeader/>
    <div class="sep20"></div>
    <div class="box">
      <div class="sider">
        <MySider/>
      </div>
      <div class="post">
        <h1 class="title">
          {{article.title}}
        </h1>
        <div class="article-info">
          <span class="article-detail author">
            {{article.author}}
          </span>
          <span class="article-detail created-time">
            {{article.created}}
          </span>
          <span class="article-detail update-time">
            {{article.updated}}
          </span>
        </div>
        <div class="show-content">
          <mavon-editor v-model="article.content"
                        v-html="article.content"
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
        aid:this.$route.params.aid,
        article:{}
      }
    },
    created() {
      this.getInfo()
    },
    computed: {},
    methods: {
      changeData(value, render) {
        console.log(render)
      },

      async getInfo() {
        let res = await this.$axios({
          url: '/api/article/getInfo',
          method: 'POST',
          data: {
            aid: this.aid
          }
        })
        this.article = res.data.data
        this.article.content = marked(res.data.data.content)
      }

    }
  }
</script>

<style scoped lang="scss">
  .sep20 {
    height: 20px;
  }
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

    .article-info {
      border: 1px solid #2c3e50;
      height: 40px;
      /*width: auto;*/
    }
    .article-detail{
      /*display: flex;*/
      border: 1px solid #2c3e50;
      line-height: 20px;
      display: inline-block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 10px;

    }

    .show-content {
      border: 1px solid sienna;
      min-height: 600px;
      margin: 10px;
    }
  }
</style>
