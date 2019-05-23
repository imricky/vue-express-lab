<template>
  <div class="layout">
    <MyHeader/>
    <div class="sep20"></div>

    <div class="layout">
      <Layout>
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu active-name="basic-setting" theme="light" width="auto" :class="menuitemClasses">
            <MenuItem name="basic-setting" :to="'/member/'+username+'/setting'">
              <Icon type="ios-settings-outline" />
              <span>用户设置</span>
            </MenuItem>
            <MenuItem name="article-manage" :to="'/member/'+username+'/articleManage'">
              <Icon type="ios-list-box-outline" />
              <span>文章管理</span>
            </MenuItem>
            <MenuItem name="1-3">
              <Icon type="ios-settings"></Icon>
              <span>Option 3</span>
            </MenuItem>
          </Menu>
          <div slot="trigger"></div>
        </Sider>
        <Layout>
          <Content class="content">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </div>

    <MyFooter/>
  </div>
</template>

<script>
  import _ from 'lodash'
  import MyHeader from '../../components/MyHeader'
  import MyFooter from '../../components/MyFooter'
  import MySider from '../../components/MySider'


  export default {
    name: "member",
    components: {
      MyFooter,
      MyHeader,
      MySider,
    },
    data() {
      return {
        username:this.$route.params.username,
        _id:'',
        isCollapsed: false
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      async getUserInfo(){
        let user = await this.$axios({
          url: '/api/user/getInfo',
          method: 'POST',
          data: {
            username: this.username
          }
        })
        console.log(user.data.data)
        if(!_.isEmpty(user)){
          let _id = user.data.data
        }
      }
    },
    created() {
      // this.getUserInfo()
    },
    mounted() {

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route'(to, from) {
        console.log(to)
        console.log(from)
      }
    },
  }
</script>

<style scoped lang="scss">
  .layout{
    border: 1px solid #d7dde4;
    /*background: #f5f7f9;*/
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .sep20 {
    height: 20px;
  }

  .content{
    margin: 10px;
    background: #fff;
    min-height: 525px;
  }
</style>
