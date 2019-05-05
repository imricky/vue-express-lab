<template>
  <div class="list-wrapper">
    <Card v-for="item in movieList" class="article-content">
      <p slot="title">{{item.name}}</p>
      <a :href="item.url" target="_blank" class="list-url">{{item.url}} </a>
      <p>{{item.rate}}</p>
    </Card>
  </div>
</template>

<script>
  /*
   *  author: imricky
   *  time: 2019-05-05 19:58
   *  function: 文章列表摘要组件
  */
  export default {
    name: "ArticleAbstractCard",
    data(){
      return {
        movieList: [
          {
            name: 'The Shawshank Redemption',
            url: 'https://movie.douban.com/subject/1292052/',
            rate: 9.6
          },
          {
            name: 'Leon:The Professional',
            url: 'https://movie.douban.com/subject/1295644/',
            rate: 9.4
          },
          {
            name: 'Farewell to My Concubine',
            url: 'https://movie.douban.com/subject/1291546/',
            rate: 9.5
          },
          {
            name: 'Forrest Gump',
            url: 'https://movie.douban.com/subject/1292720/',
            rate: 9.4
          },
          {
            name: 'Life Is Beautiful',
            url: 'https://movie.douban.com/subject/1292063/',
            rate: 9.5
          },
          {
            name: 'Spirited Away',
            url: 'https://movie.douban.com/subject/1291561/',
            rate: 9.2
          }
        ],
      }
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
