<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="search">
            <Input search enter-button placeholder="Enter something..."/>
          </div>
          <div class="layout-nav" v-if="getUsername">

            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              {{username + "123"}}
            </MenuItem>
          </div>
          <div class="layout-nav" v-else>
            <MenuItem name="1" to="/signin">
              <Icon type="ios-navigate"></Icon>
              登录
            </MenuItem>
            <MenuItem name="2" to="signup">
              <Icon type="ios-keypad"></Icon>
              注册
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger class="sider">
          <div class="demo-avatar">
            <Avatar shape="square" icon="ios-person" size="large"/>
            <Avatar shape="square" icon="ios-person"/>
            <Avatar shape="square" icon="ios-person" size="small"/>
          </div>
          <div class="tags">
            <Tag color="default">default</Tag>
            <Tag color="primary">primary</Tag>
            <Tag color="success">success</Tag>
            <Tag color="error">error</Tag>
            <Tag color="warning">warning</Tag>
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
          </div>
        </Sider>
        <Layout class="content-wrapper">
          <Content class="content">
            <ArticleAbstractCard/>
          </Content>
        </Layout>

      </Layout>
      <Footer class="layout-footer-center">2019 &copy; imricky</Footer>
    </Layout>
  </div>
</template>

<script>
  import ArticleAbstractCard from "../components/ArticleAbstractCard"
  import jwt from 'jsonwebtoken'
  export default {
    name: "Main",
    components: {
      ArticleAbstractCard
    },
    data() {
      return {
        value: '',
        username: ''
      }
    },
    computed:{
      getUsername(){
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
      '$route' (to, from) {
        console.log(to)
        this.fetchData()
      }
    },
    methods: {
      abc() {
        console.log(123)
      },
      fetchData() {
        //怎么页面显示呢，直接从jwt中获取用户名，显示到页面上，若果需要进一步操作，则再发请求进行校验
        console.log(window.localStorage.getItem('jwt_token'))
        let token = window.localStorage.getItem('jwt_token')
        if(token){
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
    }
  }
</script>

<style scoped lang="scss">
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .search {
    width: 200px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 13px;
    left: 60px;

    > .search-button {
      float: left;
      position: relative;
      left: 205px;
      bottom: 45px;

    }
  }

  .content-wrapper {
    padding: 0 24px 24px;

    > .content {
      padding: 24px;
      min-height: 550px;
      background: #fff
    }
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .sider {
    background: #fff;
    minHeight: '380px'
  }

  .content-container {
    padding: '0 24px 24px';
  }

  .layout-footer-center {
    text-align: center;
    /*position: fixed;*/
    /*bottom: 0px;*/
    /*width: 100%;*/
  }
</style>

