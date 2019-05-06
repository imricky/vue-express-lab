<template>
  <div class="list-wrapper">
    <Card v-for="item in articleList" class="article-content" :key="item.title">
<!--      <p slot="title">{{item.name}}</p>-->
<!--      <a :href="item.url" target="_blank" class="list-url">{{item.url}} </a>-->
      <p>{{item.title}}</p>
      <p>{{item.content}}</p>
      <p>{{item.viewCount}}</p>
      <p>{{item.commentCount}}</p>
      <p>{{item.time}}</p>
      <p>{{item.author}}</p>
      <p>{{item.tags}}</p>
      <p>{{item.isPublish}}</p>
    </Card>
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  /*
   *  author: imricky
   *  time: 2019-05-05 19:58
   *  function: 文章列表摘要组件
  */
  export default {
    name: "ArticleAbstractCard",
    data(){
      return {
        articleList: '',
      }
    },
    methods:{
      getList(){
        axios.get("/api/article/getList", {  // 这里的 this 指向 Vue
        })
            .then((response) => {
              this.articleList = response.data.data
            })
            .catch((error) => {
              console.log(error)
            })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
  .list-wrapper{
    background:#eee;
    padding: 10px;
    width: 1000px;
    margin: 0 auto;
    >.article-content{
      margin: 10px;
      .list-url{
        color: #FF9E92;
      }
    }

  }
</style>
