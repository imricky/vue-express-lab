<template>
  <div class="layout">
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>

  export default {
    name: "SignIn",
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 1, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!')
            let username = this.formInline.user
            let password = this.formInline.password
            this.$axios.post('/api/user/login', {
              username,
              password
            }).then(response => {
              let data = response.data
              if (data.success === true) {
                this.$Message.success({
                  content: '登录成功',
                  onClose: () => {
                    console.log(`username是${username}`)
                    this.$router.push(
                        {
                          path: '/',
                          //params: { userId: '123' } //写了path，param不生效
                        })
                  }
                })
              }
            })
                .catch(e => {
                  this.$Message.error(e)
                })
          } else {
            this.$Message.error('Fail!')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .layout {
    position: relative;
  }
</style>
