<template>
  <div id="Top">
    <div class="Content">
      <div class="Logo" @click="backToHome"></div>
      <i class="Line"></i>
      <div class="Search">
        <Input search placeholder="Enter something..."/>
      </div>
      <div class="Button" v-if="user.username === void 0">
        <router-link to="/signin">
          <Button icon="md-log-in" class="Login-Button">登录</Button>
        </router-link>
        <router-link to="/signup">
          <Button icon="md-person-add" class="Register-Button">注册</Button>
        </router-link>
      </div>
      <div class="Button" v-else>
        <router-link :to="'/member/'+user.username">
          <Button icon="md-log-in" class="Login-Button">{{user.username}}</Button>
        </router-link>
        <Button icon="md-person-add" class="Register-Button" @click="logout">登出</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import {mapMutations,mapState} from 'vuex'

  export default {
    name: "MyHeader",
    data() {
      return {
        // username: user.username,
        // _id:''
      }
    },
    computed: {
      localComputed () { /* ... */ },
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState([
          'user'
      ])
    },
    created() {
      //获取localStorage里的jwt判断是否登录
      //判断localStorage里有没有数据，有的话就全部取出来，赋值给state
      if(window.localStorage.getItem('username')){
        let user = {}
        user.jwt_token = window.localStorage.getItem('jwt_token')
        user.username = window.localStorage.getItem('username')
        user._id = window.localStorage.getItem('_id')
        this.reset_user(user)
      }

      // this.getUsername()
      this.$EventBus.$on('updateUser',(user)=>{
        console.log(user)
          console.log(`nameshisha:${user.username}`)
      })
    },
    methods: {
      ...mapMutations(['reset_user','unset_user']),
      backToHome() {
        this.$router.push({path: '/'})
      },
      //注销
      logout() {
        console.log(`${this.username}注销了`)
        this.unset_user()
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
