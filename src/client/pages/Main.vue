<template>
  <div class="layout">
    <MyHeader/>
    <div class="sep20"></div>

    <div class="box">
      <div class="sider">
        <MySider/>
      </div>
      <ArticleAbstractCard/>
    </div>

    <MyFooter/>
  </div>
</template>

<script>
  import MyHeader from '../components/MyHeader'
  import MyFooter from '../components/MyFooter'
  import MySider from '../components/MySider'
  import ArticleAbstractCard from "../components/ArticleAbstractCard"
  import jwt from 'jsonwebtoken'

  export default {
    name: "Main",
    components: {
      MyFooter,
      MyHeader,
      MySider,
      ArticleAbstractCard
    },
    data() {
      return {
        value: '',
        username: ''
      }
    },
    computed: {
      getUsername() {
        return this.username
      }
    },
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route'(to, from) {
        console.log(to)
        this.fetchData()
      }
    },
    methods: {
      fetchData() {
        //怎么页面显示呢，直接从jwt中获取用户名，显示到页面上，若果需要进一步操作，则再发请求进行校验
        let token = window.localStorage.getItem('jwt_token')
        if (token) {
          let userInfo = jwt.decode(token)
          this.username = userInfo.username
        }
        // replace getPost with your data fetching util / API wrapper
        // getPost(this.$route.params.id, (err, post) => {
        //   this.loading = false
        //   if (err) {
        //     this.error = err.toString()
        //   } else {
        //     this.post = post
        //   }
        // })
      },
      logout() {
        console.log(123)
        window.localStorage.removeItem('jwt_token')
        this.$router.go(0) //路由刷新，但是会一瞬间白屏，体验不好
        // location.reload() //同样的效果
      },
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

  .sep20 {
    height: 20px;

  }


</style>

