<template>
  <div class="login">
    <el-tabs
            v-model="activeName"
            tab-position="bottom"
            >
      <el-tab-pane label="用户密码登陆" name="userLogin">
    <el-page-header @click="gethome()" title="返回主页" content="用户登录" />
    <br><br><br>
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" label-width="70px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" />
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="warning" size="small" @click="login()">登录</el-button>
            <el-button type="success" size="small" @click="register()">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="邮箱登陆" name="email">
        <el-page-header @click="gethome()" title="返回主页" content="邮箱登陆" />
        <br><br><br>
        <el-form ref="loginRef2" :model="loginForm2" :rules="loginRules2"  label-width="70px">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginForm2.email" />
          </el-form-item>
          <el-form-item label="验证码" prop="code" >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input v-model="loginForm2.code"  >
                </el-input>
              </el-col>
              <el-col :span="12" >
                <div v-if="codeSwitch">
                  <el-button type="success" size="small" @click="stopGetCode()" >发送验证码</el-button>
                </div>
                <div v-else>
                  <el-button type="info" disabled="true">{{codeGetTimeout}}秒</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="warning" size="small" @click="login2()">登录</el-button>
          </el-form-item>
        </el-form>
       </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ElMessageBox } from 'element-plus'
export default {
  name: "Login",
  data() {
    let emailPattern=(rule,value,callback)=>{
      let emailDreg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if(!emailDreg.test(value)){
        callback(new Error("邮箱格式不对,如:xxx@163.com"))
      }else{
        callback();
      }};
    return {
      codeSwitch:true,
      codeGetTimeout:60,
      activeName:'userLogin',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loginForm2: {
        email: '',
        code: ''
      },
      loginRules2: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur' },
          {validator:emailPattern,trigger: 'blur'}
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async stopGetCode(){
      await this.$refs.loginRef2.validateField("email", async v => {
        if (!v) return
        this.codeSwitch = false;
        const {data: res} = await this.$http.post('/getEmailCode', this.loginForm2)
        if (res.success === false){
          this.codeSwitch=true;
          return this.$message.error(res.msg)
        }
        this.$message.success(res.msg)
        var times = setInterval(() => {
          this.codeGetTimeout--; //递减
          if (this.codeGetTimeout <= 0) {
            // <=0 变成获取按钮
            this.codeSwitch = true;
            clearInterval(times);
          }
        }, 1000);
      })
    },
    login() {
      this.$refs.loginRef.validate(async v => {
        // console.log(v)
        if (!v) return
        // console.log(this.loginForm)
        const { data: res } = await this.$http.post('/login', this.loginForm)
        // console.log(res)
        if (res.success === false) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        window.sessionStorage.setItem('token', res.data)
        // window.$cookies.set('token', res.data)
        const { data: res2 } =await this.$http.get('/user/getUserByToken')
        window.sessionStorage.setItem('user', JSON.stringify(res2.data))
        // ElMessageBox.alert('登录成功')
        // window.$cookies.set('user', JSON.stringify(res2.data))
        await this.$router.push('/home')
      })
    },
    login2() {
      this.$refs.loginRef2.validate(async v => {
        if (!v) return
        const { data: res } = await this.$http.post('/LoginEmailCode', this.loginForm2)
        // console.log(res)
        if (res.success === false) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        window.sessionStorage.setItem('token', res.data)
        // window.$cookies.set('token', res.data)
        const { data: res2 } =await this.$http.get('/user/getUserByToken')
        window.sessionStorage.setItem('user', JSON.stringify(res2))
        // ElMessageBox.alert('登录成功')
        // window.$cookies.set('user', JSON.stringify(res2.data))
        await this.$router.push('/home')
      })
    },
    register() {
      this.$router.push('/register')
    },
    gethome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.login {
  width: 280px;
  height: 250px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2)
}

.btn {
  float: right;
}
</style>
