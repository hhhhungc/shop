<template>
  <div class="wrapper">
    <div class="login_box">
      <div class="left">1</div>
      <div class="right">
        <p>Welcome back</p>
        <h2>Login to your admin</h2>
        <el-form ref="formRef" :rules="formRules" :model="user">
          <el-form-item label="帐号" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="signin">登入</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        username: 'dial012@yahoo.com.tw',
        password: ''
      },
      formRules: {
        username: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    checkLogin() {
      this.$http.post('api/user/check').then((res) => {
        // console.log('@@', res.data.success)
        if (!res.data.success) return
        this.$router.push('/admin')
      })
    },
    signin() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) return
        this.$http.post('admin/signin', this.user).then((res) => {
          if (!res.data.success) {
            return this.$message.error('帐号或密码错误，请重新输入！')
          } else {
            const token = res.data.token
            const expired = res.data.expired
            // console.log(token, expired)
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`
            this.$router.push('/admin')
          }
        })
      })
    }
  },
  created() {
    this.checkLogin()
  }
}
</script>

<style lang="scss" scoped>
body {
  display: flex;
  align-items: center;
  padding: 40px 0;
}
.wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 41px);
  margin: 0 auto;
}
.wrapper:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url('https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1517583106829-61e14fcbddf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80')
    no-repeat center;
  background-size: cover;
  z-index: -1;
  filter: blur(50px);
}
.login_box {
  width: 700px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 19px 5px rgba(0, 0, 0, 0.2);
}
.left {
  height: 100%;
  width: 50%;
  background: url('https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1517583106829-61e14fcbddf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80')
    no-repeat center;
  background-size: cover;
}
.right {
  width: 50%;
  margin: 40px 0;
  p {
    margin: 0;
    font-size: 14px;
    color: #888;
  }
  h2 {
    position: relative;
    padding-bottom: 10px;
    font-size: 20px;
  }
  h2:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 4px;
    width: 50px;
    border-radius: 2px;
    background: #409eff;
  }
}
.el-form {
  margin: 20px 40px;
}
</style>
