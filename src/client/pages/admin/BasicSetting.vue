<template>
  <div class="setting">
    <Form ref="userInfo" :model="userInfo" :rules="ruleValidate" :label-width="80">
      <Divider orientation="left" size="small">基本信息</Divider>
      <FormItem label="_id" required prop="_id">
        <Input v-model="userInfo._id" clearable disabled class="basic-input"></Input>
      </FormItem>
      <FormItem label="用户名" required prop="username">
        <Input v-model="userInfo.username" clearable class="basic-input"></Input>
      </FormItem>
      <FormItem label="一句话简介" prop="description">
        <Input v-model="userInfo.description" clearable class="basic-input"></Input>
      </FormItem>
      <FormItem label="手机" prop="phone">
        <Input v-model="userInfo.phone" clearable class="basic-input"></Input>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="userInfo.email" clearable class="basic-input"></Input>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input v-model="userInfo.remark" clearable class="basic-input"></Input>
      </FormItem>
      <Divider orientation="left" size="small">其他信息</Divider>
      <FormItem label="GitHub" prop="github">
        <Input v-model="userInfo.selfLink.github" clearable class="basic-input"></Input>
      </FormItem>
      <FormItem label="简书" prop="jianshu">
        <Input v-model="userInfo.selfLink.jianshu" clearable class="basic-input"></Input>
      </FormItem>
      <FormItem label="掘金" prop="juejin">
        <Input v-model="userInfo.selfLink.juejin" clearable class="basic-input"></Input>
      </FormItem>
      <Divider orientation="left" size="small">友链</Divider>
      <FormItem
        v-for="(item, index) in userInfo.friendLink.items"
        :key="index"
        :label="'Link ' + item.index"
        :prop="item.name">
        <Row>
          <Col span="5">
            <Input type="text" v-model="item.name" placeholder="友链名称"></Input>
          </Col>
          <Col span="14">
            <Input type="text" v-model="item.url" placeholder="url..."></Input>
          </Col>
          <Col span="4" offset="1">
            <Button @click="handleRemove(index)">Delete</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="12">
            <Button type="dashed" @click="handleAdd" icon="md-add">添加友链</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Button icon="ios-search" @click="handleSubmit('userInfo')">提交</Button>
        <Button icon="ios-search" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'

  export default {
    name: "BasicSetting",
    data() {
      return {
        username: this.$route.params.username,
        _id: '',
        userInfo: {
          _id: '',
          username: '',
          phone: '',
          email: '',
          remark: '',
          description:'',
          selfLink:{
            github:'',
            jianshu:'',
            juejin: ''
          },
          friendLink: {
            index:1,
            items: [
              {
                name: '',
                url: '',
                index: 1
              }
            ]
          }
        },
        ruleValidate: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          phone: [
            // {type: 'phone', message: '手机号格式不正确', trigger: 'blur'}
          ],
          // remark: [
          //   { required: true, message: 'Please select gender', trigger: 'change' }
          // ],
        }
      }
    },
    computed: {},
    methods: {
      handleAdd () {
        this.userInfo.friendLink.index++
        this.userInfo.friendLink.items.push({
          name: '',
          url: '',
          index: this.userInfo.friendLink.index,
        })
      },
      handleRemove (index) {
        this.userInfo.friendLink.items.splice(index,1)
        // this.userInfo.friendLink.index -= 1 //TODO 这个地方怎么动态改变标签的名称，以后解决
      },

      async getUserInfo() {
        let token = window.localStorage.getItem('jwt_token')
        let jwtUser
        if (token) {
          jwtUser = jwt.decode(token)
        }
        let res = await this.$axios({
          url: '/api/user/getInfo',
          method: 'POST',
          data: {
            _id: jwtUser._id
          }
        })
        let user = res.data.data
        if (!_.isEmpty(user)) {
          this.userInfo._id = user._id
          this.userInfo.username = user.username
          this.userInfo.phone = user.phone
          this.userInfo.email = user.email
          this.userInfo.remark = user.remark
          this.userInfo.description = user.description
          this.userInfo.selfLink = user.selfLink
          this.userInfo.friendLink.items = user.friendLink
          this.userInfo.friendLink.index = this.userInfo.friendLink.items.length
        }
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.updateUser().then(res => {
              if (res.data.data.ok === 1) {
                this.$Message.success({
                  content: '保存成功',
                  onClose: () => {
                    this.$router.go(0)
                  }
                })
              }
            })
          } else {
            this.$Message.error('校验失败!')
            return false
          }
        })
      },
      async updateUser() {
        let res = await this.$axios({
          url: '/api/user/' + this.userInfo._id,
          method: 'PATCH',
          data: {
            username: this.userInfo.username,
            phone: this.userInfo.phone,
            email: this.userInfo.email,
            remark: this.userInfo.remark,
            description: this.userInfo.description,
            updated: Date.now(),
            selfLink: this.userInfo.selfLink,
            friendLink: this.userInfo.friendLink
          }
        })
        return res
      }
    },
    created() {
      this.getUserInfo()
    },
    mounted() {

    },
  }
</script>

<style scoped lang="scss">
  .setting {
    border: 3px solid slategray;
    /*width: 600px;*/
  }

  .basic-input {
    /*margin: 5px;*/
    padding: 10px 20px 0 0;
  }
</style>
