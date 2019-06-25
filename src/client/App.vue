<template>
  <div id="app">
<!--    <h1>Hello App!</h1>-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <BackTop></BackTop>
<!--    <Main />-->
  </div>
</template>

<script>
  // import Main from "./pages/Main"

  export default {
    name: 'app',
    // components: {
    //   Main
    //
    // }
  }
</script>

<style>
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
</style>
