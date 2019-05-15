<template>
  <div id="Top">
    <div class="Content">
      <div class="Logo"></div>
      <i class="Line"></i>
      <div class="Search">
        <Input search placeholder="Enter something..." />
      </div>
      <div class="Button">
        <Button icon="ios-search" class="Login-Button">登录</Button>
        <Button icon="ios-search" class="Register-Button">注册</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped lang="scss">
  #Top{
    text-align: center;
    background-color: #fff;
    height: 44px;
    font-size: 15px;
    font-weight: 500;
    background-size: 44px 44px;
    border-bottom: 1px solid rgba(0,0,0,.22);
    padding: 0 20px 0 20px;
  }
  .Content{
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
  .Logo{
    width: 64px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
  }
  .Line{
    height: 29px;
    width: 1px;
    background-color: #ebebeb;
    margin-left: 17px;
  }
  .Search{
    margin-left: 20px;
  }
  .Button{
    flex: 1 1;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    .Login-Button{
      margin-right: 20px;
    }
    .Register-Button{
      margin-right: 40px;
    }
  }
</style>
