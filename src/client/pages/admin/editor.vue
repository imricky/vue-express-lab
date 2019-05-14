<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content class="content">
        <Divider orientation="left" size="small" >标题</Divider>
        <Input v-model="title" class="input title" clearable placeholder="Enter something..."  />
        <Divider orientation="left" size="small">标签</Divider>
        <Input v-model="tags" class="input tags" icon="ios-clock-outline" placeholder="Enter something..." />
        <Divider orientation="left" size="small">正文</Divider>
        <Input v-model="content" class="input content-body" type="textarea" :rows="14" placeholder="Enter something..." />
        <div class="publish">
          <Button icon="ios-search">发布</Button>
          <Button icon="ios-search">预览</Button>
        </div>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>
<script>
  export default {
    name:'Editor',
    data () {
      return {
        title: '',
        tags:'',
        content:''
      }
    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
  .content{
    margin: 0 auto;
    box-sizing: border-box;
    border: 1px solid red;
    min-height: 600px;
    min-width: 800px;
  }
  .input{
    margin-top: 5px;
    display: block;
    width: 800px;
  }
  .title{
    margin: 0 auto;

  }
  .tags{
    /*margin: 0 auto;*/
  }
  .content-body{
    max-height: 600px;
    height: 300px;
  }

  .publish{
    border: 1px solid black;
    height: 40px;
    margin-top: 50px;
  }
</style>
