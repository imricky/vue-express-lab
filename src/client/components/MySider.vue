<template>
  <div id="RightBar">
    <div id="author">
      <p class="author-image">
        <Avatar size="large" class="author-head">{{userInfo.username}}</Avatar>
      </p>
      <p class="author-name">{{userInfo.username}}</p>
      <p class="author-description" v-if="userInfo.description">{{userInfo.description}}</p>
      <p class="author-description" v-else>这家伙很懒，什么都没留下</p>

    </div>
    <!--    <Divider>More Info</Divider>-->

    <div class="tags-cloud" ref="tagsCloud">
<div></div>
    </div>

    <div id="info">
      <div class="state">
        日志
        <Divider type="vertical"/>
        <a href="#">分类</a>
        <Divider type="vertical"/>
        <a href="#">标签</a>
      </div>
      <Divider orientation="left">其它</Divider>
      <div class="self-data">
        <a class="self-link" v-if="this.userInfo.selfLink.github" :href="this.userInfo.selfLink.github" target="_blank">
          <Icon type="logo-github"/>
          Github
        </a>
        <a class="self-link" v-if="this.userInfo.selfLink.juejin" :href="this.userInfo.selfLink.juejin" target="_blank">
          <Icon type="md-bowtie"/>
          掘金
        </a>
        <a class="self-link" v-if="this.userInfo.selfLink.jianshu" :href="this.userInfo.selfLink.jianshu"
           target="_blank">
          <Icon type="ios-bookmarks"/>
          简书
        </a>
      </div>
      <Divider orientation="left">友链</Divider>
      <div class="self-data">
        <a class="self-link" v-for="item in this.userInfo.friendLink" :href="item.url" target="_blank">
          <Icon type="ios-link-outline"/>
          {{item.name}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import WordCloud from 'wordcloud'

  export default {
    name: "MySider",
    data() {
      return {
        userInfo: {
          _id: '',
          username: '',
          description: '',
          phone: '',
          email: '',
          remark: '',
          selfLink: '',
          friendLink: ''
        },
        tags: [
          ['foo', 12, 'http://google.com?q=foo'],
          ['bar', 6, 'http://google.com?q=bar'],
          ['zoo', 10, 'http://google.com?q=bar']
        ]
      }
    },
    methods: {
      async getUserInfo() {
        let token = window.localStorage.getItem('jwt_token')
        let jwtUser
        let user
        if (token) {
          jwtUser = jwt.decode(token)
          let res = await this.$axios({
            url: '/api/user/getInfo',
            method: 'POST',
            data: {
              _id: jwtUser._id
            }
          })
          user = res.data.data
        } else {
          user = void 0
        }
        if (!_.isUndefined(user)) {
          this.userInfo._id = user._id
          this.userInfo.username = user.username
          this.userInfo.description = user.description
          this.userInfo.selfLink = user.selfLink
          this.userInfo.friendLink = user.friendLink
        }
      },
  //     var $box = $('<div id="box" hidden />');
  // $canvasContainer.append($box);
  // window.drawBox = function drawBox(item, dimension) {
  //   if (!dimension) {
  //     $box.prop('hidden', true);
  //
  //     return;
  //   }
  //
  //   var dppx = $dppx.val();
  //
  //   $box.prop('hidden', false);
  //   $box.css({
  //     left: dimension.x / dppx + 'px',
  //     top: dimension.y / dppx + 'px',
  //     width: dimension.w / dppx + 'px',
  //     height: dimension.h / dppx + 'px'
  //   });
  // };
    },
    created() {
      this.getUserInfo()
    },
    mounted() {
      this.$nextTick(()=>{
        // this.$refs.tagsCloud.style.backgroundColor = 'red'
      })

      WordCloud(this.$refs.tagsCloud, {
        list: this.tags,
        gridSize: 20,
        fontWeight: 'normal',
        weightFactor: 5,
        fontFamily: 'Hiragino Mincho Pro, serif',
        color: 'random-dark',
        // backgroundColor: '#f0f0f0',
        rotateRatio: 0,
        // classes:"tags-cloud-span",
        classes: "cloud",
        hover: window.drawBox,
        click: function (item) {
          alert(item[0] + ': ' + item[2])
        },
      })
      console.log(this.$refs.tagsCloud)
    }
  }
</script>

<style scoped lang="scss">
  #RightBar {
    width: 270px;
    border: 1px solid red;
    min-height: 500px;
    margin-right: 30px;
  }

  .author-image {
    display: block;
    margin: 0 auto;
    padding: 2px;
    max-width: 96px;
    height: 96px;
    margin-top: 5px;
    border: 1px solid #239bf0;

    .author-head {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto;
      margin-left: 5px;
      margin-top: 5px;
    }
  }

  .author-name {
    display: block;
    border: 1px solid #239bf0;
    height: 32px;
    text-align: center;
    line-height: 32px;
    font-size: 16px;
    margin-top: 5px;
  }

  .author-description {
    display: block;
    border: 1px solid #239bf0;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    color: #FF9E92;
    margin-top: 5px;
  }

  .tags-cloud {
    border: 1px solid #2c3e50;
    height: 200px;
    margin-top: 5px;
  }
  .cloud{
    color: #FF9E92 !important;
    font-weight:bold;
    font-size: 100px;
    background-color: black;
  }

  .state {
    border: 1px solid #239bf0;
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-size: 14px;
    margin-top: 5px;
  }

  .self-data {
    border: 1px solid #239bf0;
    margin-top: 5px;
    min-height: 128px;

    .self-link {
      display: block;
      font-size: 14px;
      padding: 5px 0;
    }
  }
</style>
