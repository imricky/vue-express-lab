<template>
  <div id="Top">
    <div class="Content">
      <div class="Logo" @click="backToHome"></div>
      <i class="Line"></i>
      <div class="Search">
        <Input search placeholder="Enter something..."/>
      </div>
      <div class="Button" v-if="!isLogin">
        <router-link to="/signin">
          <Button icon="md-log-in" class="Login-Button">登录</Button>
        </router-link>
        <router-link to="/signup">
          <Button icon="md-person-add" class="Register-Button">注册</Button>
        </router-link>
      </div>
      <div class="Button" v-else>
        <router-link :to="'/member/'+username">
          <Button icon="md-log-in" class="Login-Button">{{username}}</Button>
        </router-link>
        <Button icon="md-person-add" class="Register-Button" @click="logout">登出</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'

  export default {
    name: "MyHeader",
    data() {
      return {
        username: '',
        _id:''
      }
    },
    computed: {
      isLogin() {
        if (this.username === '') {
          return false
        }
        return true
      }
    },
    created() {
      //获取localStorage里的jwt判断是否登录
      this.getUsername()
    },
    methods: {
      backToHome() {
        this.$router.push({path: '/'})
      },
      async getUsername() {
        let token = window.localStorage.getItem('jwt_token')
        if (token) {
          let userInfo = jwt.decode(token)
          console.log('执行了')
          this._id = userInfo._id
          let res = await this.$axios({
            url: '/api/user/getInfo',
            method: 'POST',
            data: {
              _id: userInfo._id
            }
          })
          this.username = res.data.data.username
        }
      },
      //注销
      logout() {
        console.log(`${this.username}注销了`)
        window.localStorage.removeItem('jwt_token')
        this.$router.go(0) //路由刷新，但是会一瞬间白屏，体验不好
        // location.reload() //同样的效果
      },
    }
  }
</script>

<style scoped lang="scss">
  #Top {

    text-align: center;
    background-color: #fff;
    height: 44px;
    font-size: 15px;
    font-weight: 500;
    background-size: 44px 44px;
    border-bottom: 1px solid rgba(0, 0, 0, .22);
    padding: 0 20px 0 20px;

  }

  .Content {
    position: relative;
    max-width: 1100px;
    min-width: 600px;
    padding: 0 16px;
    margin: 0 auto;
    /*border: 1px solid #FF9E92;*/
    display: flex;
    height: 44px;
    align-items: center;
  }

  .Logo {
    width: 64px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    cursor: pointer
  }

  .Line {
    height: 29px;
    width: 1px;
    background-color: #ebebeb;
    margin-left: 17px;
  }

  .Search {
    margin-left: 20px;
  }

  .Button {
    flex: 1 1;
    justify-content: flex-end;
    display: flex;
    align-items: center;

    .Login-Button {
      margin-right: 20px;
    }

    .Register-Button {
      /*margin-right: 40px;*/
    }
  }
</style>
