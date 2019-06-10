<template>
  <div class="list-wrapper">
    <Card v-for="item in articleList" class="article-content" :key="item.title">
      <div class="title">
        <router-link :to="'/article/'+item.aid">
          <p>{{item.title}}</p>
        </router-link>
      </div>
      <Divider class="article-divider"/>
      <div class="content">
        <p>{{item.content}}</p>
      </div>
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="4">
          <Icon type="ios-pricetags-outline"/>
          <span class="view-info tags">
            <a href="#"
               v-for="(i,index) in handleTags(item.tags)"
               :key="index">{{i}}
            </a>
            <span class="info-dot">•</span>
          </span>
        </Col>
        <Col span="4" v-if="item.viewCount">
          <Icon type="ios-eye-outline"/>
          <span class="view-info viewCount">
            {{item.viewCount}}
            <span class="info-dot">•</span>
          </span>
        </Col>
        <Col span="4" v-if="item.commentCount">
          <Icon type="ios-code-working"/>
          <span class="view-info">
            {{item.commentCount}}
            <span class="info-dot">•</span>
          </span>
        </Col>
        <Col span="4">
          <span class="view-info">
            <Icon type="ios-time-outline"/>
            {{item.time}}
            <span class="info-dot">•</span>
          </span>
        </Col>
        <Col span="4">
          <Icon type="ios-person-outline"/>
          <span class="view-info author">

            {{item.author}}
          </span>
        </Col>
      </Row>
      <div class="info">

      </div>
    </Card>
    <!--      分页器-->
    <div class="page">
      <Page :total="totalCount" show-total class="paging-bar"
            @on-change="changePage"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  /*
   *  author: imricky
   *  time: 2019-05-05 19:58
   *  function: 文章列表摘要组件
  */
  export default {
    name: "ArticleAbstractCard",
    data() {
      return {
        articleList: '',
        totalCount: 0,//总条数
        currentPage: 1,//当前页
      }
    },
    methods: {
      getList() {
        this.$axios({
          url: '/api/article/getList',
          method: 'POST',
          data: {
            currentPage: this.currentPage
          }
        })
            .then(res => {
              this.articleList = res.data.data.article
              this.totalCount = res.data.data.totalCount
            })
            .catch(e => {
              this.$Message.error(`出错啦,原因是：${e}`)
              return false
            })
      },
      handleTags(tags) {
        if (tags) {
          if (tags.indexOf(',') === -1) {
            return tags
          } else {
            return tags.split(',')
          }
        }
        return tags
      },
      /*
       *  author: imricky
       *  time: 2019-06-10 11:49
       *  function: 分页组件
       *  参数：page：当前页 ,从0 开始
       *       start:开始数据 开始条数
       *       limit:每页显示多少条 ，限定为10条
      */
      changePage(page) {
        this.currentPage = page
        this.getList()
      }
    },
    computed: {},
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
  .list-wrapper {
    box-sizing: border-box;
    border: 3px solid rebeccapurple;
    margin: 0 auto;
    margin-left: 10px;
    background: #eee;
    max-width: 770px;
    min-width: 470px;

    > .article-content {
      margin: 5px;
      overflow: hidden;

      .title {
        color: #778087
      }

      .article-divider {
        margin: 10px 0;
      }

      .content {
        height: 100px;
        max-width: 700px;
        min-width: 350px;
        width: 700px;
        border: 1px solid red;
      }

      .info {
        text-align: left;
      }

      .view-info {
        padding: 0 5px;

        .info-dot {
          padding: 0 10px;
        }
      }

      .author {
        color: #FF9E92;
      }
    }

    .page {
      height: 60px;
      border: 1px solid red;
      position: relative;

      > .paging-bar {
        height: 40px;
        width: 500px;
        border: 1px solid red;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        /*margin: 0 auto;*/

      }
    }
  }
</style>
