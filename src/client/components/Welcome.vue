<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="search">
            <Input v-model="value" placeholder="Enter something..." class="search-input"/>
            <Button type="primary" shape="circle" icon="ios-search" class="search-button"></Button>
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              登录
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              注册
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff',minHeight: '380px'}">

        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            Content
          </Content>
        </Layout>
      </Layout>
      <Footer class="layout-footer-center">2019 &copy; imricky</Footer>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "Welcome",
    data() {
      return {
        value: ''
      }
    }
  }
</script>

<style scoped lang="scss">
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
  .search{
    width: 200px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    /*top: 15px;*/
    left: 60px;
    >.search-button{
      float: left;
      position: relative;
      left: 205px;
      bottom:45px;

    }
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

