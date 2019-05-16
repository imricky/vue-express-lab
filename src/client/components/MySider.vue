<template>
  <div id="RightBar">
    <div id="author">
      <img src="" class="author-image" alt="" >

      <p class="author-name">Ricky</p>
      <p class="author-description">The Best or Nothing</p>
    </div>
    <Divider>More Info</Divider>
    <div id="info">
      <div class="state">
        日志
        <Divider type="vertical" />
        <a href="#">分类</a>
        <Divider type="vertical" />
        <a href="#">标签</a>
      </div>
      <div class="person-data">
        <a class="person-link">
          <Icon type="logo-github" />
          Github
        </a>
        <a class="person-link">
          <Icon type="md-bowtie" />
          掘金
        </a>
        <a class="person-link">
          <Icon type="ios-bookmarks" />
          简书
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MySider"
  }
</script>

<style scoped lang="scss">
  #RightBar{
    width: 270px;
    border: 1px solid red;
    min-height: 400px;
    margin-right: 20px;
  }
  .author-image{
    display: block;
    margin: 0 auto;
    padding: 2px;
    max-width: 96px;
    height: 96px;
    margin-top: 5px;
    border: 1px solid #239bf0;
  }
  .author-name{
    display: block;
    border: 1px solid #239bf0;
    height: 32px;
    text-align: center;
    line-height: 32px;
    font-size: 16px;
    margin-top: 5px;
  }
  .author-description{
    display: block;
    border: 1px solid #239bf0;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    color: #FF9E92;
    margin-top: 5px;
  }
  .state{
    border: 1px solid #239bf0;
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-size: 14px;
  }
  .person-data{
    border: 1px solid #239bf0;
    margin-top: 5px;
    min-height: 128px;
    .person-link{
      display: block;
      font-size: 14px;
      padding: 5px 0;
    }
  }
</style>
