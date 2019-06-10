<template>
  <div id="app">
<!--    <h1>Hello App!</h1>-->
<!--    <p>-->
<!--      &lt;!&ndash; use router-link component for navigation. &ndash;&gt;-->
<!--      &lt;!&ndash; specify the link by passing the `to` prop. &ndash;&gt;-->
<!--      &lt;!&ndash; <router-link> will be rendered as an `<a>` tag by default &ndash;&gt;-->
<!--      <router-link to="/foo">Go to Foo</router-link>-->
<!--      <router-link to="/bar">Go to Bar</router-link>\-->
<!--      <router-link to="/main">Go to Main</router-link>-->
<!--    </p>-->
    <router-view></router-view>
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
