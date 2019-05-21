<template>
  <div class="layout">
    <MyHeader/>
    <div class="sep20"></div>

    <div class="box">

    </div>

    <MyFooter/>
  </div>
</template>

<script>
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
      }
    },
    computed: {},
    methods: {},
    created() {

    },
    mounted() {

    },
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
