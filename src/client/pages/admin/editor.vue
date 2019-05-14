<style scoped>
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

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-footer-center {
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
        <Divider orientation="left" size="small">标题</Divider>
        <Input v-model="title" class="input title" clearable placeholder="Enter something..."/>
        <Divider orientation="left" size="small">标签</Divider>
        <Input v-model="tags" class="input tags" icon="ios-clock-outline" placeholder="Enter something..."/>
        <Divider orientation="left" size="small">正文</Divider>
        <Input v-model="content" class="input content-body" v-if="!isMarked" type="textarea" :rows="14"
               placeholder="Enter something..."/>
        <div class="preview animated fadeIn content-body" v-if="isMarked" v-html="mdHtml" tabIndex="1" v-focus></div>
        <div class="publish">
          <Button icon="ios-search">发布</Button>
          <Button icon="ios-search" @click="preview">预览</Button>
        </div>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>
<script>
  import marked from 'marked'
  import hljs from 'highlight.js'
  import javascript from 'highlight.js/lib/languages/javascript';
  import 'highlight.js/styles/monokai-sublime.css';

  // marked.setOptions({
  //   renderer: new marked.Renderer(),
  //   highlight: function (code) {
  //     return hljs.highlightAuto(code).value
  //   },
  //   sanitize: true
  // })

  marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      }
  );

  export default {
    name: 'Editor',
    data() {
      return {
        isMarked: false,
        mdHtml: '',
        title: '',
        tags: '',
        content: ''

      }
    },
    methods: {
      preview(){
        this.isMarked = !this.isMarked
        if(this.isMarked){
          this.mdHtml = marked(this.content)
        }
      }
    },
    computed:{

    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin: 0 auto;
    box-sizing: border-box;
    border: 1px solid red;
    min-height: 600px;
    min-width: 800px;
  }

  .input {
    margin-top: 5px;
    display: block;
    width: 800px;
  }

  .title {
    margin: 0 auto;

  }

  .tags {
    /*margin: 0 auto;*/
  }

  .content-body {
    max-height: 600px;
    height: 300px;
  }

  .publish {
    border: 1px solid black;
    height: 40px;
    margin-top: 50px;
  }

  .preview {
    border: 1px solid salmon;
  }
</style>
