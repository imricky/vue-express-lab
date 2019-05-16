<template>
  <div class="list-wrapper">
<!--    {{articleList}}-->
    <Card v-for="item in articleList" class="article-content" :key="item.title">
      <div class="title">
        <p>{{item.title}}</p>
      </div>
      <Divider/>
      <div class="content">
        <p>{{item.content}}</p>
      </div>
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="4">
          <span class="view-info tags">
            <a href="#"
               v-for="(i,index) in handleTags(item.tags)"
               :key="index">{{i}}
            </a>
            <span class="info-dot">•</span>
          </span>
        </Col>
        <Col span="4">
          <span class="view-info viewCount" v-if="item.viewCount">
            {{item.viewCount}}
            <span class="info-dot">•</span>
          </span>
        </Col>
        <Col span="4">
          <span class="view-info">
            {{item.commentCount}}
            <span class="info-dot">•</span>
          </span>
        </Col>
        <Col span="4">
          <span class="view-info">
            {{item.time}}
            <span class="info-dot">•</span>
          </span>
        </Col>
        <Col span="4">
          <span class="view-info author">
            {{item.author}}
          </span>
        </Col>
      </Row>
      <div class="info">

      </div>
      <p>{{item.isPublish}}</p>
    </Card>
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
      }
    },
    methods: {
      getList() {
        axios.get("/api/article/getList", {  // 这里的 this 指向 Vue
        })
            .then((response) => {
              this.articleList = response.data.data
            })
            .catch((error) => {
              console.log(error)
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
    margin: 0 auto;
    margin-left: 10px;
    background: #eee;
    /*padding: 10px;*/
    max-width: 770px;
    min-width: 470px;
    /*margin: 0 auto;*/
    > .article-content {
      margin: 10px;
      overflow: hidden;

      .list-url {
        color: #FF9E92;
      }

      .title {
        padding: 0 10px;
      }

      .content {
        height: 100px;
        width: 750px;
        border: 1px solid red;
      }

      .info {
        text-align: left;
      }

      .view-info {
        padding: 0 5px;

        .info-dot {
          padding: 0 5px 0 12px;
        }
      }

      .author {
        color: #FF9E92;
      }
    }

  }
</style>
