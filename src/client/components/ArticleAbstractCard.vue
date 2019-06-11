<template>
  <div class="list-wrapper">
    <Card v-for="item in articleList" class="article-content" :key="item.title">
      <router-link :to="'/article/'+item.aid">
        <div>
          <p class="title">{{item.title}}</p>
        </div>
        <Divider class="article-divider"/>
        <div class="content">
          <p>{{item.content}}</p>
        </div>
      </router-link>
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="12">
          <Icon type="ios-pricetags-outline"/>
          <span class="view-info tags">
            <a href="#"
               v-for="(i,index) in handleTags(item.tags)"
               :key="index" class="tags-split">
              {{i}}
            </a>
          </span>
        </Col>
        <!--        <Col span="4" v-if="item.viewCount">-->
        <!--          <Icon type="ios-eye-outline"/>-->
        <!--          <span class="view-info viewCount">-->
        <!--            {{item.viewCount}}-->
        <!--            <span class="info-dot">•</span>-->
        <!--          </span>-->
        <!--        </Col>-->
        <!--        <Col span="4" v-if="item.commentCount">-->
        <!--          <Icon type="ios-code-working"/>-->
        <!--          <span class="view-info">-->
        <!--            {{item.commentCount}}-->
        <!--            <span class="info-dot">•</span>-->
        <!--          </span>-->
        <!--        </Col>-->
        <Col span="8">
          <span class="view-info created-time">
            <Icon type="ios-time-outline"/>
            {{item.updated}}
          </span>
        </Col>
        <Col span="4">
          <Icon type="ios-person-outline"/>
          <span class="view-info author">
            {{item.author}}
          </span>
        </Col>
      </Row>
    </Card>
    <!--      分页器-->
    <div class="page">
      <Page :total="totalCount" show-total class="paging-bar"
            @on-change="changePage"/>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import {render_plain, convertUTCTimeToLocalTime} from '../common/js/util'
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
              this.totalCount = res.data.data.totalCount
              let tempArticleList = res.data.data.article
              this.articleList = tempArticleList.map(i => {
                i.content = marked(i.content, {
                  renderer: render_plain()
                })
                i.updated = convertUTCTimeToLocalTime(i.updated)
                return i
              })
            })
            .catch(e => {
              this.$Message.error(`出错啦,原因是：${e.message}`)
              console.log(e)
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
        window.scroll(0, 0)
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
    border: 3px solid cadetblue;
    margin: 0 auto;
    margin-left: 10px;
    background: #eee;
    max-width: 770px;
    min-width: 470px;
    width: 770px;

    > .article-content {
      margin: 5px;
      overflow: hidden;

      .title {
        color: #333;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;

        &:hover {
          color: #239bf0;
        }

      }

      .article-divider {
        margin: 10px 0;
      }

      .content {
        box-sizing: border-box;
        border: 2px solid red;
        max-width: 770px;
        min-width: 400px;
        color: #555;
        font-size: 13px;
        line-height: 24px;
      }
      .view-info {
        padding: 0 5px;

        .tags-split {
          background-color: #FFDECB;
          margin-right: 5px;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .created-time {
        font-size: 10px;
        color: #FF9E92;
      }

      .author {
        color: #FF9E92;
      }
    }

    .page {
      height: 60px;
      border: 1px solid red;
      position: relative;
      max-width: 770px;
      min-width: 470px;
      width: 450px;

      > .paging-bar {
        height: 40px;
        border: 1px solid red;
        position: relative;
        top: 50%;
        transform: translateY(-50%);

      }
    }
  }
</style>
