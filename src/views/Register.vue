<template>
    <div class="login">
        <el-page-header @click="gethome()" title="返回主页" content="用户注册" />
        <br><br><br>
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" label-width="60px">
            <el-form-item label="账号" prop="username">
                <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" />
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="warning" size="small" @click="register()">注册</el-button>
                <el-button type="success" size="small" @click="login()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        register() {
            this.$refs.loginRef.validate(async v => {
                // console.log(v)
                if (!v) return
                const { data: res } = await this.$http.post('/register', this.loginForm)
                console.log(res)
                if (res.success === false) return this.$message.error(res.msg)
                this.$message.success(res.msg + ",请登录并修改个人信息")
                // window.sessionStorage.setItem('token', res.token)
                await this.$router.push('/login')
            })
        },
        login() {
            this.$router.push('/login')
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

.home {
    float: left;
    margin-top: 20px;
}
</style>
