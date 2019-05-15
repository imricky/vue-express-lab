<template>
  <div id="Bottom">
    <div class="Content">
      <div class="wrapper">
        <div class="copyright">
          <span>
            Copyright @ 2019
            <Icon type="md-ionitron" />
            Ricky
          </span>
          <i class="Line"></i>
          <span>

        </span>
        </div>
        <div class="link">
          <p>Powered by Vue & iView | <router-link :to="{name: 'login'}" tag="span" class="login">站长登录</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyFooter"
  }
</script>

<style scoped lang="scss">
  #Bottom{
    text-align: left;
    background-color: #fff;
    height: 100px;
    font-size: 15px;
    font-weight: 500;
    background-size: 44px 44px;
    border-top: 1px solid rgba(0,0,0,.22);
    padding: 0 20px 0 20px;
  }
  .Content{
    position: relative;
    max-width: 1100px;
    min-width: 600px;
    padding: 0 16px;
    margin: 0 auto;
    /*border: 1px solid #FF9E92;*/
    /*display: flex;*/
    height: 100px;
    /*align-items: center;*/
    /*flex-wrap: wrap*/

  }
  .Line{
    height: 29px;
    width: 1px;
    background-color: red;
    margin-left: 17px;
  }
  .wrapper{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .copyright{
    /*border: 1px solid #5b6270;*/
  }
  .link{
    /*border: 1px solid #239bf0;*/
  }
</style>
