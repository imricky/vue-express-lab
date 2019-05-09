<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="search">
            <Input search enter-button placeholder="Enter something..." />
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
        <Sider hide-trigger class="sider">
          <div class="demo-avatar">
            <Avatar shape="square" icon="ios-person" size="large"/>
            <Avatar shape="square" icon="ios-person"/>
            <Avatar shape="square" icon="ios-person" size="small"/>
          </div>
          <div class="tags">
            <Tag color="default">default</Tag>
            <Tag color="primary">primary</Tag>
            <Tag color="success">success</Tag>
            <Tag color="error">error</Tag>
            <Tag color="warning">warning</Tag>
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
          </div>
        </Sider>
        <Layout class="content-wrapper">
          <Content class="content">
            <ArticleAbstractCard />
          </Content>
        </Layout>

      </Layout>
      <Footer class="layout-footer-center">2019 &copy; imricky</Footer>
    </Layout>
  </div>
</template>

<script>
  import ArticleAbstractCard from "../components/ArticleAbstractCard"
  export default {
    name: "Main",
    components:{
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
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .search {
    width: 200px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 13px;
    left: 60px;

    > .search-button {
      float: left;
      position: relative;
      left: 205px;
      bottom: 45px;

    }
  }

  .content-wrapper {
    padding: 0 24px 24px;

    > .content {
      padding: 24px;
      min-height: 550px;
      background: #fff
    }
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .sider {
    background: #fff;
    minHeight: '380px'
  }

  .content-container {
    padding: '0 24px 24px';
  }

  .layout-footer-center {
    text-align: center;
    /*position: fixed;*/
    /*bottom: 0px;*/
    /*width: 100%;*/
  }
</style>

