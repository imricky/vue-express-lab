<template>
  <div class="setting">
    <Form ref="userInfo" :model="userInfo" :rules="ruleValidate" :label-width="80">
      <FormItem label="_id" required prop="_id">
        <Input v-model="userInfo._id" clearable disabled class="basic-input"></Input>
      </FormItem>
      <FormItem label="用户名" required prop="username">
        <Input v-model="userInfo.username" clearable class="basic-input"></Input>
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
      <FormItem>
        <Button icon="ios-search" @click="handleSubmit('userInfo')">Submit</Button>
        <Button icon="ios-search" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
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
          remark: ''
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
            updated: Date.now()
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
