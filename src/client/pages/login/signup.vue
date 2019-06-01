<template>
    <div class="layout">
      <div class="shadow">
        <div class="title">Awesome Blog</div>
        <div class="input-label-wrapper">
          <div class="input-label">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="top">
              <FormItem prop="user" label="用户名">
                <Input type="text" v-model="formInline.user" placeholder="Username" class="base-input">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password" label="密码">
                <Input type="password" v-model="formInline.password" placeholder="Password" class="base-input">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password" label="邮箱📮">
                <Input type="email" v-model="formInline.email" placeholder="Email" class="base-input">
                  <Icon type="ios-mail-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem>
                <span class="problem">已有账户？</span>
              </FormItem>
            </Form>
          </div>
        </div>
        <div class="button">
          <Form>
            <FormItem>
              <Button type="success" long @click="handleSubmit('formInline')" class="sign-in">注册</Button>
            </FormItem>
          </Form>
          >
        </div>

      </div>

    </div>

</template>

<script>

  export default {
    name: "SignUp",
    data() {
      return {
        formInline: {
          user: '',
          password: '',
          email:''
        },
        ruleInline: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 1, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ],
          email: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 1, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!')
            let username = this.formInline.user
            let password = this.formInline.password
            let email = this.formInline.email
            this.$axios.post('/api/user/register', {
              username,
              password,
              email
            }).then(response => {
              let data = response.data
              if (data.success === true) {
                this.$Message.success({
                  content: '注册成功',
                  onClose: () => {
                    this.$router.push(
                        {
                          path: '/signin',
                          //params: { userId: '123' } //写了path，param不生效
                        })
                  }
                })
              } else {
                this.$Message.error({
                  content: `${data.errMessage}`,
                  onClose: () => {
                    this.formInline.user = ""
                    this.formInline.password = ""
                    this.formInline.email = ""
                  }
                })
              }
            })
                .catch(e => {
                  this.$Message.error(e.errorMessage)
                })
          } else {
            this.$Message.error('输入有错误，请重新输入')
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

  .shadow {
    width: 540px;
    height: 600px;
    border: 1px solid #FF9E92;
    position: relative;
    margin: 0 auto;
    top: 30px;
    box-shadow: #666 0 0 30px;
  }

  .title {
    height: 80px;
    font-size: 50px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 15px;
  }

  .input-label-wrapper {
    border: 2px solid #239bf0;
    height: 400px;

    .input-label {
      border: 2px solid #239bf0;
      margin: 0 10px;
      height: 320px;
      position: relative;
      top: 55%;
      transform: translateY(-50%);
    }
  }

  .base-input {
    padding: 5px 30px;
  }

  .remember {
    padding-left: 10px;
    font-size: 16px;
  }

  .problem {
    font-size: 16px;
    /*color: #FFFFFF;*/
    float: right;
    margin-right: 20px;

    &:hover {
      color: #239bf0;
      cursor: pointer;
    }
  }

  .button {
    border: 2px solid #239bf0;
    height: 60px;
    margin-top: 10px;
  }

  .sign-in {
    display: block;
    margin: 10px auto;
    border-radius: 20px;
    width: 85%;
    height: 40px;
  }
  .tip-label{
    text-align:left;
    font-size:16px;
  }
</style>
