<template>
  <div id="all">
    <div class="layout">
      <!--      <Form ref="formInline" :model="formInline" :rules="ruleInline">-->
      <!--        <FormItem prop="user">-->
      <!--          <Input type="text" v-model="formInline.user" placeholder="Username">-->
      <!--            <Icon type="ios-person-outline" slot="prepend"></Icon>-->
      <!--          </Input>-->
      <!--        </FormItem>-->
      <!--        <FormItem prop="password">-->
      <!--          <Input type="password" v-model="formInline.password" placeholder="Password">-->
      <!--            <Icon type="ios-lock-outline" slot="prepend"></Icon>-->
      <!--          </Input>-->
      <!--        </FormItem>-->
      <!--        <FormItem>-->
      <!--          <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>-->
      <!--        </FormItem>-->
      <!--      </Form>-->
    </div>
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
    background: url('../../Resources/cool-background.jpg');
    /*让整个div固定在屏幕的最上方和最左方*/
    position: fixed;
    top: 0;
    left: 0;
    /*让整个div跟屏幕实现一模一样的大小，从而达到全屏效果，
    而min-width是为了实现让屏幕宽度在1000px以内时，div的大小保持不变，
    也就是说在这种情况下，缩放屏幕宽度时，图片不要缩放（只有在1000px以内才有效）*/
    width: 100%;
    height: 100%;
    min-width: 600px;
    /*整个div在HTML页面中各个层级的下方*/
    z-index: -10;
    zoom: 1;
    background-color: #000;
    /*上面这个是背景不要重复*/
    background-repeat: no-repeat;
    /*就是让图片随屏幕大小同步缩放，但是有部分可能会被裁切，不过不至于会露白*/
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    /*这句的意思就是图片的位置，居中，靠左对齐*/
    background-position: center 0;
  }
</style>
