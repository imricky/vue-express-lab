<template>
  <div>
    <div class="Top">
      <div class="TopContent">
        <Row justify="start" type="flex" align="middle">
          <Col span="12" class="TopLeft">
            <a href="/" name="top" title="the best or nothing">
              <div id="Logo"></div>
              <div id="Search">
                <Input search placeholder="Enter something..." />
              </div>
            </a>
          </Col>
          <Col span="12" class="TopRight">
            <Button class="sign">注册</Button>
            <Button class="sign login">登录</Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="Wrapper">
      <div class="content">
        <div class="LeftBar">

        </div>
        <div class="Main"></div>
      </div>
    </div>
    <div class="Bottom">
      <div class="content">

      </div>
    </div>
  </div>
</template>

<script>
  import ArticleAbstractCard from "../components/ArticleAbstractCard"

  export default {
    name: "Main",
    components: {
      ArticleAbstractCard
    },
    data() {
      return {
        value: '',
      }
    }
  }
</script>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }

  .Top {
    text-align: center;
    background-color: #FFDECB;
    height: 44px;
    font-size: 15px;
    font-weight: 500;
    background-size: 44px 44px;
    border-bottom: 1px solid rgba(0, 0, 0, .22);
    padding: 0 20px 0 20px;

    > .TopContent {
      min-width: 600px;
      max-width: 1100px;
      max-width: 1060px;
      margin: 0 auto;
    }

    .TopLeft {
      text-align: left;
      display: inline-block;
      position: relative;
      /*margin-top: 10px;*/
    }
    .sign{
      float: right;
    }
    .sign.login{
      margin-right: 20px;
    }
  }

  #Logo {
    width: 94px;
    height: 30px;
    background-image: url('../assets/logo.png');
    background-color: #e2e2e2;
    background-size: 94px 30px;
    background-repeat: no-repeat;
    display: inline-block;
    position: relative;
    top: 6px;
  }
  #Search{
    display: inline-block;
    position: relative;
    bottom: 5px;
    margin-left: 30px;
  }

  .Wrapper{
    text-align: center;
    background-color: #e2e2e2;
    .content{
      min-width: 600px;
      max-width: 1100px;
      margin: 0 auto;
    }
  }

</style>

